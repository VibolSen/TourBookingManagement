"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const config_js_1 = require("./config.js");
const email_templates_js_1 = require("./email-templates.js");
const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const { data, error } = await config_js_1.resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Verify your email",
            html: email_templates_js_1.verificationTokenEmailTemp.replace("{verificationToken}", verificationToken),
        });
        if (error) {
            console.error("Resend API error:", error);
            throw error;
        }
    }
    catch (error) {
        console.log("error sending verification email ", error);
        throw new Error("error sending verification email");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, name) => {
    try {
        const { data, error } = await config_js_1.resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Welcome to our company",
            html: email_templates_js_1.WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        });
        if (error)
            throw error;
    }
    catch (error) {
        console.log("error sending welcome email", error);
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const { data, error } = await config_js_1.resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Reset Your Password",
            html: `Click <a href="${resetURL}">here</a> to reset your password`,
        });
        if (error)
            throw error;
    }
    catch (error) {
        console.log("error sending password reset email", error);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    try {
        const { data, error } = await config_js_1.resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Password Reset was Sucssful",
            html: `Your password was reset succssfully`,
        });
        if (error)
            throw error;
    }
    catch (error) {
        console.log("error sending password reset email", error);
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
