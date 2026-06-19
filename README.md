# Digital Equb Platform

A modern web application that digitizes the traditional Ethiopian "Equb" savings system - a community-based rotating savings and credit association.

## 🌟 Features

### User Features
- **Account Management**: Secure signup/login with profile customization
- **Group Discovery**: Browse and join existing Equb groups
- **Group Creation**: Start your own savings circle with custom rules
- **Payment Integration**: Seamless Telebirr payment processing
- **Payment History**: Complete transaction records
- **Real-time Notifications**: Stay updated on group activity
- **Dashboard**: Comprehensive overview of all savings activity

### Admin Features
- **Winner Selection**: Choose round winners fairly
- **Member Management**: Add/remove group members
- **Payment Reminders**: Send notifications to members
- **Group Settings**: Customize contribution amounts and rules
- **Reports & Analytics**: Track group performance

## 🎨 Design System

Based on the Ethiopian design aesthetic with a modern twist:

### Colors
- **Primary Blue**: `#1E3A8A` (Trust and stability)
- **Success Green**: `#10B981` (Growth and success)
- **Warning Yellow**: `#F59E0B` (Attention and alerts)
- **Danger Red**: `#EF4444` (Errors and critical actions)

### Typography
- **Heading XL**: 48px Bold
- **Heading L**: 32px SemiBold
- **Heading M**: 24px
- **Body Large**: 18px
- **Body**: 16px
- **Caption**: 14px

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Navbar.tsx       # Main navigation
│   │   ├── Sidebar.tsx      # Desktop sidebar
│   │   ├── TopBar.tsx       # Dashboard top bar
│   │   ├── BottomNav.tsx    # Mobile navigation
│   │   ├── GroupCard.tsx    # Group display card
│   │   ├── StatsCard.tsx    # Statistics card
│   │   └── NotificationCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── BrowseGroupsPage.tsx
│   │   ├── GroupDetailPage.tsx
│   │   ├── PaymentsPage.tsx
│   │   └── ProfilePage.tsx
│   ├── layouts/
│   │   ├── RootLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── data/
│   │   └── mockData.ts      # Mock data for development
│   ├── routes.tsx           # React Router configuration
│   └── App.tsx              # Application entry point
└── styles/
    ├── theme.css            # Design system tokens
    ├── fonts.css            # Font imports
    └── tailwind.css         # Tailwind configuration
```

## 🚀 Tech Stack

- **Framework**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Build Tool**: Vite 6.3.5
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animation**: Motion (Framer Motion)
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

## 📱 Responsive Design

The application is fully responsive with:
- **Desktop**: Sidebar navigation with full-featured layouts
- **Mobile**: Bottom navigation bar with optimized views
- **Tablet**: Adaptive layouts that work on all screen sizes

## 🔐 Security Notes

**Current Implementation**: Mock authentication and data
**Production Requirements**:
- Implement Supabase backend for data persistence
- Add user authentication (Supabase Auth)
- Secure Telebirr API integration
- Input validation and sanitization
- HTTPS enforcement
- Rate limiting on payment endpoints

## 📊 Mock Data

The application includes comprehensive mock data for:
- 3 sample groups with different configurations
- 10+ mock users/members
- Payment history records
- Notification examples

## 🎯 Key Pages

### Home Page
- Hero section with value proposition
- Features showcase
- "How It Works" explanation
- Testimonials from users
- Call-to-action sections

### Dashboard
- Statistics overview (active groups, total saved, pending payments)
- Active groups grid
- Upcoming payments
- Recent notifications

### Browse Groups
- Search functionality
- Filter by status (active/full)
- Create new group modal
- Group cards with key information

### Group Detail
- Member list with payment status
- Round progress tracking
- Current winner display
- Admin control panel (for group admins)
- Payment statistics

### Payments
- Pending payments section
- Telebirr payment modal with processing animation
- Complete payment history table
- Payment status badges

### Profile
- Personal information management
- Password change functionality
- Notification preferences
- Security settings

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm

### Installation
```bash
pnpm install
```

### Running the Development Server
The Vite dev server is already running in the environment.

### Building for Production
```bash
pnpm run build
```

**Note**: Do NOT run `vite build` manually - use the configured build command.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Future Enhancements

### Phase 1 (Current) ✅
- Complete UI/UX implementation
- Routing and navigation
- Mock data integration
- Responsive design

### Phase 2 (Planned)
- Supabase backend integration
- Real authentication
- Database persistence
- Telebirr payment gateway

### Phase 3 (Future)
- SMS notifications via Ethiopian carriers
- Group chat functionality
- Automated winner selection algorithms
- Mobile app (React Native)
- Multi-language support (Amharic, Oromo, Tigrinya)

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement proper backend (Supabase recommended)
2. Add real payment gateway integration
3. Implement comprehensive security measures
4. Add proper error handling
5. Set up logging and monitoring

## 📄 License

Copyright © 2026 Digital Equb. All rights reserved.

## 🙏 Acknowledgments

- Ethiopian Equb tradition and community
- Telebirr for digital payment infrastructure
- Shadcn UI for component library
- React Router team
- Tailwind CSS team

---

**Built with ❤️ for the Ethiopian community**
