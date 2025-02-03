import mongoose from 'mongoose';

const supplyPartnerSchema = new mongoose.Schema({
  businessDescription: { type: String, required: true },
  numberOfCompanies: { type: String, required: true },
  numberOfActivities: { type: String, required: true },
  location: { type: String, required: true },
  useReservation: { type: String, required: true },
  companyName: { type: String },
  websiteLink: { type: String },
  companyFrom: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  agreedToTerms: { type: Boolean, required: true },
  role: { type: String, default: 'Company' },
});

const SupplyPartner = mongoose.models.SupplyPartner || mongoose.model('SupplyPartner', supplyPartnerSchema);

export default SupplyPartner;