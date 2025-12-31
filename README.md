# ThreadFlow - Garment Factory Management System 🧵

A modern, feature-rich web platform designed to streamline production workflow management for small and medium-sized garment factories. ThreadFlow enables efficient order tracking, production stage monitoring, inventory management, and real-time delivery tracking.

## 🌟 Features

### Core Functionality
- 🔐 **Secure Authentication** - Firebase auth with email/password and social login (Google/GitHub)
- 👥 **Role-Based Access Control** - Three user roles: Admin, Manager, and Buyer
- 📦 **Product Management** - Full CRUD operations with image uploads
- 🛒 **Order System** - Complete booking flow with payment integration
- 📊 **Real-Time Tracking** - Visual timeline for production stages
- 💳 **Payment Integration** - Stripe payment gateway support
- 🌓 **Theme Toggle** - Dark/Light mode on all pages
- 📱 **Fully Responsive** - Mobile-first design for all devices
- 🔍 **Search & Filter** - Advanced filtering on products and users
- 📄 **Pagination** - Efficient data loading with pagination

### Advanced Features
- ✨ **Smooth Animations** - Framer Motion and GSAP animations
- 🎨 **Modern UI/UX** - Clean, intuitive interface with DaisyUI components
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- 📈 **Data Visualization** - Charts and graphs using Recharts
- 🚫 **Account Suspension** - Admin can suspend users with feedback system
- 🎯 **Dynamic Content** - Products featured on homepage
- 🔒 **Protected Routes** - JWT token-based authentication
- 📝 **Form Validation** - Comprehensive client-side validation

## 🎥 Demo

**Live Site:** [ThreadFlow](https://thread-flow51.netlify.app/)<br>
**Server Repository:** [ThreadFlow Server](https://github.com/Samioul51/ThreadFlow-Server)

## 🚀 Tech Stack

### Frontend Framework
- **React 19.2.0** - Modern UI library with latest features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router 7.10.1** - Client-side routing

### Styling & UI
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.5.8** - Tailwind CSS component library
- **Styled Components 6.1.19** - CSS-in-JS library

### Animation Libraries
- **Motion 12.23.25** (Framer Motion) - Production-ready animations
- **GSAP 3.14.2** - Professional-grade animation toolkit
- **React Fast Marquee 1.6.5** - Smooth scrolling marquee
- **Typewriter Effect 2.22.0** - Typewriter text animations

### UI Components
- **React Icons 5.5.0** - Icon library
- **React Image Gallery 1.4.0** - Image carousel component
- **Swiper 12.0.3** - Modern touch slider
- **React Hot Toast 2.6.0** - Beautiful toast notifications

### Authentication & Backend
- **Firebase 12.6.0** - Authentication and real-time database
- **JWT** - JSON Web Token for secure authentication

### Payment Integration
- **@stripe/react-stripe-js 5.4.1** - Stripe React components
- **@stripe/stripe-js 8.5.3** - Stripe JavaScript SDK

### Data Visualization
- **Recharts 3.5.1** - Composable charting library

### Development Tools
- **ESLint 9.39.1** - Code linting
- **Vite Plugin React 5.1.1** - React integration for Vite

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/threadflow-client.git
cd threadflow-client
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
# Firebase Authentication Credentials
VITE_FB_API_KEY=your_firebase_api_key
VITE_FB_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FB_PROJECT_ID=your_firebase_project_id
VITE_FB_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FB_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FB_APP_ID=your_firebase_app_id

# ImgBB Credentials
VITE_IMG_BB_API_KEY=your_imgbb_api_key

# Stripe Publishable key
VITE_STRIPE_PUB_KEY=your_stripe_publishable_key
```

## 4. Full Dependency List

### 🔹 Dependencies

```json
"@stripe/react-stripe-js": "^5.4.1",
"@stripe/stripe-js": "^8.5.3",
"@tailwindcss/vite": "^4.1.17",
"firebase": "^12.6.0",
"gsap": "^3.14.2",
"motion": "^12.23.25",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-fast-marquee": "^1.6.5",
"react-hot-toast": "^2.6.0",
"react-icons": "^5.5.0",
"react-image-gallery": "^1.4.0",
"react-router": "^7.10.1",
"recharts": "^3.5.1",
"styled-components": "^6.1.19",
"swiper": "^12.0.3",
"tailwindcss": "^4.1.17",
"typewriter-effect": "^2.22.0"
```

### 🔹Dev Dependencies

```json
"@eslint/js": "^9.39.1",
"@types/react": "^19.2.5",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^5.1.1",
"daisyui": "^5.5.8",
"eslint": "^9.39.1",
"eslint-plugin-react-hooks": "^7.0.1",
"eslint-plugin-react-refresh": "^0.4.24",
"globals": "^16.5.0",
"vite": "^7.2.4"
```


### 5. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

### 7. Preview Production Build

```bash
npm run preview
```

## 👥 User Roles & Permissions

### 🔴 Admin
**Full system control and oversight**

**Permissions:**
- ✅ View and manage all users (approve, suspend, change roles)
- ✅ View, update, and delete all products
- ✅ Control which products appear on homepage
- ✅ View and manage all orders
- ✅ Search and filter users

**Dashboard Routes:**
- `/dashboard/manage-users`
- `/dashboard/all-products`
- `/dashboard/all-orders`
- `/dashboard/profile`

### 🟡 Manager
**Product and order management capabilities**

**Permissions:**
- ✅ Add new products with full details
- ✅ Manage own products (update/delete)
- ✅ Approve or reject pending orders
- ✅ Add tracking updates to approved orders
- ✅ View production analytics
- ❌ Cannot manage users
- ❌ If suspended: Cannot add products or approve orders

**Dashboard Routes:**
- `/dashboard/add-product`
- `/dashboard/manage-products`
- `/dashboard/pending-orders`
- `/dashboard/approved-orders`
- `/dashboard/profile`

### 🟢 Buyer
**Product browsing and order placement**

**Permissions:**
- ✅ Browse and search all products
- ✅ Place orders for products
- ✅ View own order history
- ✅ Track orders in real-time
- ✅ Cancel pending orders
- ❌ Cannot access admin/manager features
- ❌ If suspended: Cannot place new orders

**Dashboard Routes:**
- `/dashboard/my-orders`
- `/dashboard/track-order/:orderId`
- `/dashboard/profile`

### Account Status System

**Active** ✅
- Full access to role-specific features

**Pending** ⏳
- Limited access until admin approval
- Can browse but cannot perform critical actions

**Suspended** 🚫
- **Buyer:** Cannot place new orders, can view existing orders
- **Manager:** Cannot add products or approve orders
- Users receive suspension feedback explaining the reason

## 🎯 Key Features

### 1. Authentication System

#### Registration
- Email/password with validation:
  - ✅ Must contain uppercase letter
  - ✅ Must contain lowercase letter
  - ✅ Minimum 6 characters length
- Social login (Google/GitHub)
- Role selection (Buyer/Manager)
- Default status: Pending
- Photo URL upload
- Real-time validation feedback

#### Login
- Email/password authentication
- Google OAuth
- Remember me functionality
- JWT token stored in cookies
- Automatic redirect based on role

### 2. Product Management

#### Product Features
- Multiple image uploads with preview
- Demo video support
- Category organization
- Price and quantity tracking
- Minimum Order Quantity (MOQ)
- Payment options selection
- Homepage feature toggle

#### Product Display
- 3-column responsive grid
- Quick view product cards
- Detailed product pages
- Image gallery with zoom
- Related products suggestions

### 3. Order Management System

#### Order Placement
- Auto-filled user information
- Quantity validation (min/max)
- Automatic price calculation
- Delivery address input
- Additional notes field
- Payment method selection

#### Order Tracking
- Visual production timeline
- Real-time status updates
- Multi-stage tracking:
  - ✂️ Cutting Completed
  - 🧵 Sewing Started
  - ✨ Finishing
  - ✅ QC Checked
  - 📦 Packed
  - 🚚 Shipped
  - 🏠 Out for Delivery

#### Order States
- **Pending:** Awaiting manager approval
- **Approved:** In production
- **Rejected:** Order declined
- **Completed:** Order delivered
- **Cancelled:** User cancelled (only if pending)

### 4. Payment Integration

#### Payment Methods
- **Cash on Delivery:** No upfront payment required
- **Stripe:** Secure online payment (Not real transaction.)

### 5. Dashboard Pages

#### Admin Routes

**Manage Users** (`/dashboard/manage-users`)
- User table with search/filter
- Role update functionality
- Suspend/Activate users
- Suspend reason modal
- Pagination

**All Products** (`/dashboard/all-products`)
- Complete product list
- Update/Delete actions
- Homepage feature toggle
- Product statistics

**All Orders** (`/dashboard/all-orders`)
- Orders table
- Status filtering
- Order details view
- Search functionality

#### Manager Routes

**Add Product** (`/dashboard/add-product`)
- Product creation form
- Image upload (multiple)
- Category selection
- MOQ configuration
- Payment options

**Manage Products** (`/dashboard/manage-products`)
- Own products table
- Update/Delete actions
- Search functionality
- Quick edit modal

**Pending Orders** (`/dashboard/pending-orders`)
- Orders awaiting approval
- Approve/Reject buttons
- Order details view

**Approved Orders** (`/dashboard/approved-orders`)
- Approved orders list
- Add tracking updates
- View tracking timeline
- Status management

#### Buyer Routes

**My Orders** (`/dashboard/my-orders`)
- Personal order history
- Status tracking
- Cancel pending orders
- Order details

**Track Order** (`/dashboard/track-order/:orderId`)
- Visual timeline
- Production stages
- Estimated delivery
- Real-time updates

### 6. Advanced Features

#### Search & Filter
- Product name search
- Category filtering
- Price range filtering
- Status-based filtering (orders)
- User role filtering (admin)

#### Pagination
- Efficient data loading
- Customizable items per page
- Page navigation
- Total count display

#### Theme System
- Light/Dark mode toggle
- Persistent theme preference
- Smooth theme transitions
- All pages supported

#### Notifications
- Success/error toasts
- Real-time updates
- Action confirmations
- Custom styling

## 🎨 UI/UX Features

### Design Principles
- **Consistency:** Uniform heading styles, spacing, and colors
- **Readability:** Balanced paragraph spacing and font sizes
- **Responsive:** Mobile-first approach for all devices
- **Accessibility:** WCAG compliant color contrast and keyboard navigation
- **Modern:** Latest design trends with smooth animations

## 👨‍💻 Developer

**Your Name**
- GitHub: [@Samioul51](https://github.com/Samioul51/)
- LinkedIn: [A. K. M Samioul Islam](https://www.linkedin.com/in/a-k-m-samioul-islam/)
- Email: akmsamioulislam51@gmail.com
- Portfolio: [A. K. M Samioul Islam](https://akm-samioul-islam.vercel.app/)
