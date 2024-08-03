export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV + "/api"
    : process.env.NEXT_PUBLIC_BASE_URL_DEV + "/api";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV
    : process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const policyConfig = {
  title: "Privacy Policy for Yachu Hair Oil",
  introduction:
    "Welcome to Yachu Hair Oil's Privacy Policy. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by Yachu Hair Oil and how we use it.",
  lastUpdated: "August 3, 2024",
  sections: [
    {
      title: "Information We Collect",
      content:
        "We only collect information about you if we have a reason to do so. Here are some examples of the types of information we collect:",
      list: [
        "Personal information: Name, email address, phone number, and shipping address when you make a purchase.",
        "Transaction information: Purchase history, product preferences, and payment details.",
        "Usage data: How you interact with our website, including pages visited and products viewed.",
        "Communication data: Any messages, emails, or feedback you send us.",
      ],
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect in various ways, including to:",
      list: [
        "Provide, operate, and maintain our website and services",
        "Improve, personalize, and expand our website and product offerings",
        "Understand and analyze how you use our website",
        "Develop new products, services, features, and functionality",
        "Communicate with you for customer service, updates, and marketing purposes",
        "Process your transactions and send you related information",
        "Prevent fraudulent transactions and monitor against theft",
      ],
    },
    {
      title: "Data Protection",
      content:
        "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.",
    },
    {
      title: "Your Rights",
      content:
        "If you are a resident of Nepal, you have certain data protection rights. Yachu Hair Oil aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information. You have the right to:",
      list: [
        "Access and receive a copy of the personal information we hold about you",
        "Rectify any personal information held about you that is inaccurate",
        "Request the deletion of personal information held about you",
        "Object to the processing of your personal information",
        "Request that we restrict the processing of your personal information",
        "Request transfer of your personal information",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      content:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date at the bottom of this Privacy Policy.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at:",
      list: [
        "Email: yachubusiness@gmail.com",
        "Phone: +9779745671024",
        "Address: Dallu, Swyambhu Kathmandu 15, Kathmandu 44600, Nepal",
      ],
    },
  ],
};
