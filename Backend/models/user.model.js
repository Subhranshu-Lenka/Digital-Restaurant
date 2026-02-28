import mongoose from 'mongoose';


// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// Base User Schema (Single Table Approach)
const userSchema = new mongoose.Schema(
  {
    // Common fields for all user types
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "restaurant_staff", "customer"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profileImage: {
      type: String, // URL to image
      default: null,
    },

    // Customer-specific fields (only populated when role = 'customer')
    customerProfile: {
      addresses: [
        {
          label: {
            type: String, // 'home', 'work', 'other'
            required: function () {
              return this.parent().role === "customer";
            },
          },
          street: String,
          city: String,
          state: String,
          zipCode: String,
          coordinates: {
            latitude: Number,
            longitude: Number,
          },
          isDefault: {
            type: Boolean,
            default: false,
          },
        },
      ],
      paymentMethods: [
        {
          type: {
            type: String,
            enum: ["card", "wallet", "upi"],
          },
          details: mongoose.Schema.Types.Mixed, // Encrypted payment info
          isDefault: Boolean,
        },
      ],
      dietaryRestrictions: [
        {
          type: String,
          enum: [
            "vegetarian",
            "vegan",
            "gluten-free",
            "dairy-free",
            "nut-free",
            "halal",
            "kosher",
          ],
        },
      ],
      favoriteRestaurants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
        },
      ],
      favoriteItems: [
        {
          restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
          },
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
          },
        },
      ],
      loyaltyPoints: {
        type: Number,
        default: 0,
      },
    },

    // Staff-specific fields (only populated when role = 'restaurant_staff')
    staffProfile: {
      restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: function () {
          return this.parent().role === "restaurant_staff";
        },
      },
      position: {
        type: String,
        enum: [
          "manager",
          "chef",
          "cashier",
          "waiter",
          "delivery_person",
          "kitchen_staff",
        ],
        required: function () {
          return this.parent().role === "restaurant_staff";
        },
      },
      employeeId: {
        type: String,
        unique: true,
        sparse: true, // Only required for staff
      },
      hireDate: {
        type: Date,
        required: function () {
          return this.parent().role === "restaurant_staff";
        },
      },
      salary: {
        type: Number,
        required: function () {
          return this.parent().role === "restaurant_staff";
        },
      },
      permissions: [
        {
          type: String,
          enum: [
            "view_orders",
            "manage_orders",
            "manage_menu",
            "view_analytics",
            "manage_staff",
          ],
        },
      ],
      workSchedule: [
        {
          day: {
            type: String,
            enum: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
          },
          startTime: String, // '09:00'
          endTime: String, // '17:00'
          isWorkingDay: Boolean,
        },
      ],
      performanceMetrics: {
        ordersProcessedToday: {
          type: Number,
          default: 0,
        },
        ordersProcessedThisMonth: {
          type: Number,
          default: 0,
        },
        averageRating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        totalRatings: {
          type: Number,
          default: 0,
        },
      },
    },

    // Admin-specific fields (minimal, as admin has system-wide access)
    adminProfile: {
      accessLevel: {
        type: String,
        enum: ["super_admin", "admin"],
        default: "admin",
      },
      departmentAccess: [
        {
          type: String,
          enum: [
            "restaurants",
            "users",
            "orders",
            "analytics",
            "finance",
            "support",
          ],
        },
      ],
    },

    // Common tracking fields
    lastLogin: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "staffProfile.restaurantId": 1 });
userSchema.index({ "staffProfile.employeeId": 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if account is locked
userSchema.methods.isLocked = function () {
  return !!(
    this.accountLocked &&
    this.lockUntil &&
    this.lockUntil > Date.now()
  );
};

// Static method to find users by role
userSchema.statics.findByRole = function (role) {
  return this.find({ role, isActive: true });
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.loginAttempts;
  delete userObject.lockUntil;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);