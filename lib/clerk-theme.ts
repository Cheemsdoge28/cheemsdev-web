import type { Appearance } from "@clerk/types"

// Enhanced Clerk theme with proper color values and better UX
export const clerkTheme: Appearance = {
  variables: {
    // Fixed color values - using proper HSL format
    colorPrimary: "hsl(0, 0%, 100%)", // Pure white
    colorBackground: "hsl(0, 0%, 0%)", // Pure black
    colorInputBackground: "hsl(224, 0%, 20%)", // Dark input background
    colorInputText: "hsl(0, 0%, 100%)", // White text
    colorText: "hsl(0, 0%, 100%)", // White text
    colorTextSecondary: "hsl(224, 0%, 64%)", // Muted text
    colorTextOnPrimaryBackground: "hsl(0, 0%, 0%)", // Black on white
    colorSuccess: "hsl(142, 76%, 36%)", // Green success
    colorDanger: "hsl(0, 84%, 60%)", // Red danger
    colorWarning: "hsl(38, 92%, 50%)", // Orange warning
    colorNeutral: "hsl(224, 0%, 64%)", // Neutral gray

    // Spacing and typography
    borderRadius: "0.75rem", // More reasonable border radius
    spacingUnit: "1rem",
    fontSize: "14px",
    

    // Font configuration
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyButtons: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  elements: {
    // Root container
    rootBox: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    // Main card container
    card: {
      backgroundColor: "hsl(224, 0%, 4%)",
      border: "1px solid hsl(224, 0%, 14%)",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "2rem",
    },

    // Modal and popover content
    modalContent: {
      backgroundColor: "hsl(224, 0%, 7%)",
      border: "1px solid hsl(224, 0%, 14%)",
      borderRadius: "0.75rem",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },

    // Headers
    headerTitle: {
      color: "hsl(0, 0%, 100%)",
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "1.25",
      marginBottom: "0.5rem",
    },

    headerSubtitle: {
      color: "hsl(224, 0%, 64%)",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      marginBottom: "1.5rem",
    },

    // Form elements
    formButtonPrimary: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.75rem 1.5rem",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: "hsl(0, 0%, 95%)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
      },
      "&:focus": {
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
        backgroundColor: "hsl(0, 0%, 95%)",
      },
      "&:active": {
        transform: "translateY(0)",
      },
    },

    formButtonSecondary: {
      backgroundColor: "transparent",
      color: "hsl(0, 0%, 100%)",
      border: "1px solid hsl(224, 0%, 20%)",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.75rem 1.5rem",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: "hsl(224, 0%, 10%)",
        borderColor: "hsl(224, 0%, 30%)",
      },
      "&:focus": {
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
        backgroundColor: "hsl(224, 0%, 10%)",
      },
    },

    // Input fields
    formFieldInput: {
      backgroundColor: "hsl(224, 0%, 10%)",
      color: "hsl(0, 0%, 100%)",
      border: "1px solid hsl(224, 0%, 20%)",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      padding: "0.75rem 1rem",
      transition: "all 0.15s ease-in-out",
      "&:focus": {
        borderColor: "hsl(224, 0%, 50%)",
        boxShadow: "0 0 0 3px hsla(224, 0%, 50%, 0.1)",
        outline: "none",
        backgroundColor: "hsl(224, 0%, 12%)",
      },
      "&::placeholder": {
        color: "hsl(224, 0%, 50%)",
      },
    },

    formFieldLabel: {
      color: "hsl(0, 0%, 100%)",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "0.5rem",
      display: "block",
    },

    // Social authentication buttons
    socialButtonsBlockButton: {
      backgroundColor: "hsl(224, 0%, 8%)",
      border: "1px solid hsl(224, 0%, 20%)",
      borderRadius: "0.5rem",
      color: "hsl(0, 0%, 100%)",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      "&:hover": {
        backgroundColor: "hsl(224, 0%, 12%)",
        borderColor: "hsl(224, 0%, 30%)",
        transform: "translateY(-1px)",
      },
      "&:focus": {
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
      },
    },

    socialButtonsBlockButtonText: {
      color: "hsl(0, 0%, 100%)",
      fontWeight: "500",
    },

    // Dividers
    dividerLine: {
      backgroundColor: "hsl(224, 0%, 20%)",
      height: "1px",
    },

    dividerText: {
      color: "hsl(224, 0%, 50%)",
      fontSize: "0.75rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },

    // User button and avatar
    userButtonAvatarBox: {
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      border: "2px solid hsl(224, 0%, 20%)",
      transition: "border-color 0.15s ease-in-out",
      "&:hover": {
        borderColor: "hsl(224, 0%, 40%)",
      },
    },

    userButtonPopoverCard: {
      backgroundColor: "hsl(224, 0%, 7%)",
      border: "1px solid hsl(224, 0%, 20%)",
      borderRadius: "0.75rem",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      padding: "0.5rem",
    },

    userButtonPopoverActionButton: {
      color: "hsl(0, 0%, 100%)",
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.375rem",
      transition: "background-color 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: "hsl(224, 0%, 15%)",
      },
      "&:focus": {
        backgroundColor: "hsl(224, 0%, 15%)",
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
      },
    },

    // Footer and links
    footerActionLink: {
      color: "hsl(224, 0%, 80%)",
      fontSize: "0.875rem",
      fontWeight: "500",
      textDecoration: "none",
      transition: "color 0.15s ease-in-out",
      "&:hover": {
        color: "hsl(0, 0%, 100%)",
        textDecoration: "underline",
      },
      "&:focus": {
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
        borderRadius: "0.25rem",
      },
    },

    // Error and alert states
    alertText: {
      color: "hsl(0, 84%, 70%)",
      fontSize: "0.75rem",
      fontWeight: "500",
      marginTop: "0.25rem",
    },

    formFieldErrorText: {
      color: "hsl(0, 84%, 70%)",
      fontSize: "0.75rem",
      marginTop: "0.25rem",
    },

    // Identity preview
    identityPreviewText: {
      color: "hsl(224, 0%, 64%)",
      fontSize: "0.875rem",
    },

    identityPreviewEditButton: {
      color: "hsl(224, 0%, 80%)",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "color 0.15s ease-in-out",
      "&:hover": {
        color: "hsl(0, 0%, 100%)",
      },
      "&:focus": {
        outline: "2px solid hsl(224, 0%, 64%)",
        outlineOffset: "2px",
        borderRadius: "0.25rem",
      },
    },

    // Loading states
    spinner: {
      color: "hsl(0, 0%, 100%)",
    },

    // Badge elements
    badge: {
      backgroundColor: "hsl(224, 0%, 15%)",
      color: "hsl(0, 0%, 100%)",
      fontSize: "0.75rem",
      fontWeight: "500",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.375rem",
    },
  },
}
