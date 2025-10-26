import {
  Download,
  Heart,
  Star,
  Search,
  Upload,
  Grid,
  ShoppingCart,
  Tag,
  User,
  Box,
  Headphones,
} from "lucide-react";

export const TYPEWRITER_HEADINGS = [
  {
    line1: "Instant Payouts,",
    line2: "Full Control, No Limits",
  },
  {
    line1: "Buy Once, Download",
    line2: "Anytime, Keep Forever",
  },
  {
    line1: "Discover, Buy, and Sell",
    line2: "Digital Products",
  },
  {
    line1: "Sell for Free,",
    line2: "Pay Only When You Earn",
  },
];

export const FLOATING_ICONS = [
  // Top
  {
    IconComponent: Box,
    positionClass: "top-[12%] left-[8%]",
    iconColor: "text-blue-500",
    tooltip: {
      title: "3D Models",
      description:
        "Browse thousands of high-quality 3D models for your projects. Filter by category, style, format, and more.",
    },
  },
  {
    IconComponent: ShoppingCart,
    positionClass: "top-[12%] right-[8%]",
    iconColor: "text-cyan-400",
    tooltip: {
      title: "Shopping Cart",
      description:
        "Easy checkout process with secure payment options and instant downloads.",
    },
  },

  // Left
  {
    IconComponent: Tag,
    positionClass: "top-[28%] left-[18%]",
    iconColor: "text-orange-500",
    tooltip: {
      title: "Pricing",
      description: "Flexible pricing options for creators and businesses.",
    },
  },
  {
    IconComponent: User,
    positionClass: "top-[45%] left-[5%]",
    iconColor: "text-purple-500",
    tooltip: {
      title: "User Profile",
      description:
        "Manage your account, track purchases, and customize your experience.",
    },
  },
  {
    IconComponent: Download,
    positionClass: "top-[60%] left-[18%]",
    iconColor: "text-cyan-400",
    tooltip: {
      title: "Downloads",
      description:
        "Access your purchased content anytime. Download once, keep forever.",
    },
  },
  {
    IconComponent: Heart,
    positionClass: "bottom-[12%] left-[8%]",
    iconColor: "text-red-500",
    tooltip: {
      title: "Favorites",
      description: "Save models you love for quick access later.",
    },
  },

  // Right
  {
    IconComponent: Search,
    positionClass: `top-[45%] right-[18%]`,
    // positionClass: `top-[80%] right-[10%]`,
    iconColor: "text-blue-500",
    tooltip: {
      title: "Search",
      description:
        "Find exactly what you need with powerful search and filtering tools.",
    },
  },
  {
    IconComponent: Upload,
    positionClass: "bottom-[28%] right-[5%]",
    iconColor: "text-cyan-400",
    tooltip: {
      title: "Upload",
      description: "Share your creations with the community and start earning.",
    },
  },
  {
    IconComponent: Grid,
    // positionClass: "bottom-[55%] right-[20%]",
    positionClass: "bottom-[12%] right-[20%]",
    iconColor: "text-orange-500",
    tooltip: {
      title: "Collections",
      description: "Explore curated collections of premium digital assets.",
    },
  },

  // Bottom
  {
    IconComponent: Star,
    positionClass: "bottom-[8%] left-[28%]",
    iconColor: "text-yellow-500",
    tooltip: {
      title: "Featured",
      description: "Discover trending and featured content from top creators.",
    },
  },
  {
    IconComponent: Headphones,
    positionClass: "bottom-[8%] left-[45%]",
    iconColor: "text-gray-400",
    tooltip: {
      title: "Support",
      description:
        "Get help from our dedicated support team whenever you need it.",
    },
  },
];
