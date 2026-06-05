# TourBookingManagement Project Analysis

* [ ] 

---

## 1. Architectural Overview

The project is structured as a monorepo containing a `backend` server and a `frontend` client:

- **Backend (`/backend`)**:

  - **Runtime & Framework**: Node.js with Express.js.
  - **Database**: MongoDB with Mongoose ODM.
  - **Authentication**: JWT (JSON Web Tokens) stored in cookies/headers, custom bcrypt password hashing, and Google OAuth2 integration (`passport` & `passport-google-oauth20`).
  - **File Uploads**: `multer` middleware for processing images (saved in `/uploads`).
  - **Email Notifications**: `resend` integration for welcome emails, email verification, and password resets.
- **Frontend (`/frontend`)**:

  - **Runtime & Framework**: Next.js 15.1.6 (App Router) using TypeScript, Tailwind CSS, and Shadcn UI (Radix UI) components.
  - **State Management**: Zustand stores manage auth, bookings, locations, categories, and tour packages.
  - **Animations**: Framer Motion is included for micro-interactions and transitions.
  - **Mock Service**: Integrates `json-server` reading from `db.json` on port 3002 for serving top destinations, news, and services.

---

## 2. Database Models & Schema

The backend defines 8 models under `/backend/model/`:

| Model Name              | Source File                                       | Description                                         | Key Fields & Relationships                                                                                                                        |
| :---------------------- | :------------------------------------------------ | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User**          | [user.js](./backend/model/user.js)                   | Represents all accounts (Users, Subadmins, Admins). | `name`, `email`, `role` (enum: user, subadmin, admin), `status` (pending, approved, rejected), `googleId`, `adminId` (self-reference) |
| **Admin**         | [admin.js](./backend/model/admin.js)                 | Stores Admin metadata and relationships.            | `users` (ref: User[]), `subAdmins` (ref: User[]), counts for sub-entities                                                                     |
| **Tour**          | [packageTour.js](./backend/model/packageTour.js)     | Represents customizable tour packages.              | `name`, `price`, `duration`, `category` (ref: Category), `location` (ref: Location), `company` (ref: User/subadmin)                   |
| **Booking**       | [bookingTour.js](./backend/model/bookingTour.js)     | Represents tour reservations.                       | `tour` (ref: Tour), `user` (ref: User), `approvedBy` (ref: User/subadmin), `status` (pending, approved, rejected)                         |
| **Policy**        | [policy.js](./backend/model/policy.js)               | Company policies (cancellation, privacy).           | `title`, `description`, `createdBy` (ref: User), `isActive` (boolean)                                                                     |
| **Category**      | [category.js](./backend/model/category.js)           | Categories of tours (e.g. Adventure, Beach).        | `categoryname`, `status` (Active, Inactive)                                                                                                   |
| **Location**      | [location.js](./backend/model/location.js)           | Tour locations (e.g. Siem Reap, Phnom Penh).        | `nameLocation`, `status` (Active, Inactive)                                                                                                   |
| **SupplyPartner** | [SupplyPartner.js](./backend/model/SupplyPartner.js) | Underspecified model.                               | **Unused/Legacy:** Model exists but has no routes or controller imports.                                                                    |

---

## 3. Frontend Routing & Page Hierarchy

The frontend uses Next.js App Router folders under `/frontend/app/`:

- **Public Routes**:
  - `/` (Home landing page)
  - `/login`, `/signup` (Auth pages)
  - `/login-admin` (Admin login gateway)
  - `/allTopTours` (Lists all tours)
  - `/verify-email` (Account activation portal)
- **User Routes** (wrapped under `/profile/[id]` with `layout.jsx`):
  - `/profile/[id]/topcard` (Post-login user landing page)
  - `/profile/[id]/myprofile` (Profile edits, biography, and stats)
  - `/profile/[id]/DetailPageCard` (Tour detail viewing)
  - `/profile/[id]/favorites` (Wishlist/favorites)
- **Company/Subadmin Dashboard** (wrapped under `/company/[id]`):
  - `/company/[id]/dashboard` (General booking statistics)
  - `/company/[id]/addpackage` (Tour package creation, updates, deletion)
  - `/company/[id]/booking` (Manage reservations & guests status)
  - `/company/[id]/policy` (Manage policies)
- **Admin Panel** (wrapped under `/admin/[id]`):
  - `/admin/[id]/dashboard-admin` (Overview of users and subadmins)
  - `/admin/[id]/category` (CRUD for Tour Categories)
  - `/admin/[id]/location` (CRUD for Tour Locations)
  - `/admin/[id]/user` (User list management)

---

## 4. Key Bugs & Architectural Issues Identified

During review, several critical bugs, logic discrepancies, and clean-up areas were identified:

### ⚠️ Route & Param Mismatch on Tour Details

The page to view tour details is located at `/profile/[id]/DetailPageCard/page.jsx`.

- Since it is nested inside `/profile/[id]`, the `id` hook from `useParams()` returns the **User's ID**, not the Tour ID.
- However, the component contains: `const tour = tours.find((tour) => tour._id === id);`.
- This causes a lookup mismatch (searching for a Tour with the User's ID), causing a "Tour not found" error.
- **Solution**: Reorganize the path structure or update the navigation to pass the tour ID as an explicit query param or sub-route segment (e.g. `/profile/[id]/DetailPageCard/[tourId]`).

### ⚠️ Broken Destination Links

- The homepage and card components (`TopCard.jsx` and `page.tsx`) link to `/destination/${tour._id}`, but there is **no `/destination` directory** under `frontend/app`. Any clicks on these cards will lead to a Next.js 404 page.

### ⚠️ Booking Status UI Bug

- In `frontend/app/company/[id]/booking/page.jsx`, the UI checks for booking status using Capitalized strings:
  ```javascript
  booking.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
  ```
- However, the database model `bookingTour.js` saves the default status in lowercase `"pending"`.
- This causes all pending bookings to evaluate to `false` and show up as green (approved) inside the company guest table, presenting misleading data.

### ⚠️ Copy-Paste Text Bug in Bookings Guest Table

- In `frontend/app/company/[id]/booking/page.jsx`, the empty state checks the list of bookings:
  ```javascript
  if (bookings.length === 0 && !loading) {
    return <p className="p-6">No policies found for this subadmin.</p>;
  }
  ```
- This mistakenly prints "No **policies** found" rather than "No **bookings** found".

### ⚠️ Layout Hero Leak

- The profile layout `/profile/[id]/layout.jsx` renders `<ProfileUser id={id} />` as a global shell.
- Because `ProfileUser` contains the large Hero banner ("Discover Amazing Places" with a search input), this banner is leaking into all user subpages, such as `/profile/[id]/myprofile` and `/profile/[id]/favorites`, harming visual cleanliness.

### ⚠️ Buggy & Unused `createBooking` in Zustand Store

- In `frontend/store/bookingStore.jsx`, the `createBooking` method tries to fetch from `${API_URL}/${userId}` but `userId` is never declared or passed to the function, which would fail.
- However, this store method is currently bypassed entirely because `topcard/page.jsx` issues a raw `fetch` call direct to the backend endpoint. The store action should be fixed and adopted for clean state practices.
