import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock adapter instance
// { delayResponse: 500 } adds a slight delay to simulate network latency
const mock = new MockAdapter(axios, { delayResponse: 500 });

// --- Mock Data ---

const defaultSettings = {
  siteName: 'JonathanPortfolio',
  contactEmail: 'contact@jonathanportfolio.com',
  contactPhone: '+1 (555) 123-4567',
  contactWhatsapp: '+1 (555) 123-4567',
  websiteTheme: 'luxury-gold',
  heroText: 'Capturing Moments, Creating Memories',
  heroSubtext: 'Professional Photography Services',
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com'
  }
};

let settings = {};
try {
  const savedSettings = localStorage.getItem('mockSettings');
  if (savedSettings) {
    settings = JSON.parse(savedSettings);
  } else {
    settings = defaultSettings;
    localStorage.setItem('mockSettings', JSON.stringify(settings));
  }
} catch(e) {
  settings = defaultSettings;
}


const defaultCategories = [
  { _id: 'cat1', name: 'Weddings', slug: 'weddings' },
  { _id: 'cat2', name: 'Portraits', slug: 'portraits' },
  { _id: 'cat3', name: 'Events', slug: 'events' },
];

let categories = [];
try {
  const saved = localStorage.getItem('mockCategories');
  if (saved) {
    categories = JSON.parse(saved);
  } else {
    categories = defaultCategories;
    localStorage.setItem('mockCategories', JSON.stringify(categories));
  }
} catch(e) {
  categories = defaultCategories;
}

const defaultGallery = [
  // Weddings
  { _id: 'img1', title: 'Beach Wedding', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', category: categories[0], isFeatured: true },
  { _id: 'img2', title: 'Sunset Engagement', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', category: categories[0], isFeatured: false },
  { _id: 'img3', title: 'Church Ceremony', imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop', category: categories[0], isFeatured: false },
  { _id: 'img4', title: 'First Dance', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1973&auto=format&fit=crop', category: categories[0], isFeatured: true },
  
  // Portraits
  { _id: 'img5', title: 'Classic Portrait', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', category: categories[1], isFeatured: true },
  { _id: 'img6', title: 'Studio Portrait', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop', category: categories[1], isFeatured: false },
  { _id: 'img7', title: 'Outdoor Headshot', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop', category: categories[1], isFeatured: true },
  { _id: 'img8', title: 'Creative Portrait', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', category: categories[1], isFeatured: false },
  
  // Events
  { _id: 'img9', title: 'Corporate Event', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop', category: categories[2], isFeatured: true },
  { _id: 'img10', title: 'Conference Keynote', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', category: categories[2], isFeatured: false },
  { _id: 'img11', title: 'Tech Meetup', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', category: categories[2], isFeatured: true },
  { _id: 'img12', title: 'Party Crowd', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop', category: categories[2], isFeatured: false }
];

let gallery = [];
try {
  const saved = localStorage.getItem('mockGallery');
  if (saved) {
    gallery = JSON.parse(saved);
  } else {
    gallery = defaultGallery;
    localStorage.setItem('mockGallery', JSON.stringify(gallery));
  }
} catch(e) {
  gallery = defaultGallery;
}

const defaultServices = [
  {
    _id: 'srv1',
    title: 'Wedding Package',
    description: 'Full day coverage including preparation, ceremony, and reception.',
    price: 1500,
    deliverables: ['High-res digital files', 'Online gallery', 'Photo album'],
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    isActive: true,
  },
  {
    _id: 'srv2',
    title: 'Portrait Session',
    description: '1 hour outdoor or studio session.',
    price: 250,
    deliverables: ['15 Retouched photos', 'Digital download'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    isActive: true,
  },
  {
    _id: 'srv3',
    title: 'Corporate Events',
    description: 'Comprehensive coverage for corporate gatherings, seminars, and parties.',
    price: 800,
    deliverables: ['Full event coverage', 'Edited images within 48 hrs', 'Commercial usage rights'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
    isActive: true,
  },
  {
    _id: 'srv4',
    title: 'Engagement Shoot',
    description: 'Romantic 2-hour session at a location of your choice.',
    price: 400,
    deliverables: ['30 Retouched photos', 'Outfit changes', 'Online gallery'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    isActive: true,
  }
];

let services = [];
try {
  const saved = localStorage.getItem('mockServices');
  if (saved) {
    services = JSON.parse(saved);
  } else {
    services = defaultServices;
    localStorage.setItem('mockServices', JSON.stringify(services));
  }
} catch(e) {
  services = defaultServices;
}

const defaultBookings = [
  {
    _id: 'bkg1',
    customerName: 'Alice Johnson',
    referenceNumber: 'REF-8291',
    eventType: 'Wedding Photography',
    eventDate: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    eventTime: '10:00 AM',
    eventLocation: 'Sunset Beach Resort, Malibu',
    guestCount: 150,
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 987-6543',
    budgetRange: '₹1,00,000 - ₹2,00,000',
    status: 'New Inquiry',
    totalPrice: 1500,
    isContactQuery: false,
    specialRequirements: 'We would love to have drone coverage during the sunset.',
    services: [services[0]],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    emailsSent: []
  },
  {
    _id: 'bkg2',
    customerName: 'Mark Smith',
    referenceNumber: 'REF-4022',
    eventType: 'General Inquiry',
    eventDate: new Date().toISOString(),
    eventLocation: 'N/A',
    email: 'mark.smith@example.com',
    phone: '+1 (555) 321-4567',
    status: 'Reviewed',
    totalPrice: 0,
    isContactQuery: true,
    specialRequirements: 'I just wanted to know if you do product photography for e-commerce websites?',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    emailsSent: [
      { emailType: 'Reply', subject: 'Regarding product photography', dateSent: new Date().toISOString() }
    ]
  }
];

let bookings = [];
try {
  const saved = localStorage.getItem('mockBookings');
  if (saved) {
    bookings = JSON.parse(saved);
  } else {
    bookings = defaultBookings;
    localStorage.setItem('mockBookings', JSON.stringify(bookings));
  }
} catch(e) {
  bookings = defaultBookings;
}

const dashboardStats = {
  metrics: {
    totalBookings: 1,
    totalRevenue: 1500,
    totalImages: 5,
    totalServices: 4
  },
  statusDistribution: {
    'New Inquiry': 1,
    'Reviewed': 1
  },
  monthlyAnalytics: [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 1500 }
  ],
  recentInquiries: bookings,
  recentActivities: [
    { type: 'booking', message: 'New booking inquiry received from Alice Johnson', time: bookings[0].createdAt },
    { type: 'query', message: 'Mark Smith submitted a contact query', time: bookings[1].createdAt }
  ]
};

// --- Mock Interceptors ---

// Settings
mock.onGet('/api/settings').reply(() => [200, settings]);
mock.onPut('/api/settings').reply((config) => {
  const updatedSettings = JSON.parse(config.data);
  settings = { ...settings, ...updatedSettings };
  localStorage.setItem('mockSettings', JSON.stringify(settings));
  return [200, settings];
});

// Gallery & Categories
mock.onGet('/api/categories').reply(() => [200, categories]);
mock.onPost('/api/categories').reply((config) => {
  const { name } = JSON.parse(config.data);
  const newCat = { _id: Math.random().toString(36).substring(7), name, slug: name.toLowerCase().replace(/\s+/g, '-') };
  categories.push(newCat);
  localStorage.setItem('mockCategories', JSON.stringify(categories));
  return [201, newCat];
});
mock.onPut(/\/api\/categories\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  const { name } = JSON.parse(config.data);
  const cat = categories.find(c => c._id === id);
  if (cat) {
    cat.name = name;
    cat.slug = name.toLowerCase().replace(/\s+/g, '-');
    localStorage.setItem('mockCategories', JSON.stringify(categories));
    return [200, cat];
  }
  return [404, { message: 'Category not found' }];
});
mock.onDelete(/\/api\/categories\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  categories = categories.filter(c => c._id !== id);
  localStorage.setItem('mockCategories', JSON.stringify(categories));
  return [200, { message: 'Category deleted' }];
});

mock.onGet('/api/gallery').reply(() => [200, gallery]);
mock.onPost('/api/gallery').reply((config) => {
  const imagePayload = JSON.parse(config.data);
  const newImage = { 
    _id: Math.random().toString(36).substring(7), 
    ...imagePayload,
    category: categories.find(c => c._id === imagePayload.categoryId) || categories[0]
  };
  gallery.push(newImage);
  localStorage.setItem('mockGallery', JSON.stringify(gallery));
  return [201, newImage];
});
mock.onPut(/\/api\/gallery\/reorder/).reply((config) => {
  const { images } = JSON.parse(config.data);
  gallery = images;
  localStorage.setItem('mockGallery', JSON.stringify(gallery));
  return [200, gallery];
});
mock.onPut(/\/api\/gallery\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  const { title, categoryId, isFeatured } = JSON.parse(config.data);
  const img = gallery.find(i => i._id === id);
  if (img) {
    if (title !== undefined) img.title = title;
    if (categoryId !== undefined) img.category = categories.find(c => c._id === categoryId) || img.category;
    if (isFeatured !== undefined) img.isFeatured = isFeatured;
    localStorage.setItem('mockGallery', JSON.stringify(gallery));
    return [200, img];
  }
  return [404, { message: 'Image not found' }];
});
mock.onDelete(/\/api\/gallery\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  gallery = gallery.filter(i => i._id !== id);
  localStorage.setItem('mockGallery', JSON.stringify(gallery));
  return [200, { message: 'Image deleted' }];
});

// Services
mock.onGet('/api/services').reply(() => [200, services]);
mock.onGet(/\/api\/services\?.*/).reply(() => [200, services]);
mock.onPost('/api/services').reply((config) => {
  const payload = JSON.parse(config.data);
  const newService = { _id: Math.random().toString(36).substring(7), ...payload };
  services.push(newService);
  localStorage.setItem('mockServices', JSON.stringify(services));
  return [201, newService];
});
mock.onPut(/\/api\/services\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  const payload = JSON.parse(config.data);
  const service = services.find(s => s._id === id);
  if (service) {
    Object.assign(service, payload);
    localStorage.setItem('mockServices', JSON.stringify(services));
    return [200, service];
  }
  return [404, { message: 'Service not found' }];
});
mock.onDelete(/\/api\/services\/[a-zA-Z0-9_-]+/).reply((config) => {
  const id = config.url.split('/').pop();
  services = services.filter(s => s._id !== id);
  localStorage.setItem('mockServices', JSON.stringify(services));
  return [200, { message: 'Service deleted' }];
});


// Auth
mock.onPost('/api/auth/login').reply(200, {
  user: { _id: 'admin', name: 'Admin', role: 'admin' },
  token: 'mock-jwt-token'
});
mock.onPost('/api/auth/forgot-password').reply(200, { message: 'Reset email sent.' });

// Bookings
mock.onGet('/api/bookings').reply(() => [200, bookings]);
mock.onPost('/api/bookings').reply((config) => {
  const newBooking = JSON.parse(config.data);
  newBooking._id = Math.random().toString(36).substring(7);
  newBooking.referenceNumber = 'REF-' + Math.floor(Math.random() * 10000);
  newBooking.status = 'New Inquiry';
  newBooking.createdAt = new Date().toISOString();
  bookings.push(newBooking);
  localStorage.setItem('mockBookings', JSON.stringify(bookings));
  return [201, newBooking];
});

// Mock Booking Actions (Status, Emails, Invoices)
mock.onPut(/\/api\/bookings\/[a-zA-Z0-9_-]+\/status/).reply((config) => {
  const id = config.url.split('/')[3];
  const { status } = JSON.parse(config.data);
  const booking = bookings.find(b => b._id === id);
  if (booking) {
    booking.status = status;
    localStorage.setItem('mockBookings', JSON.stringify(bookings));
  }
  return [200, { message: 'Status updated successfully' }];
});
mock.onPost(/\/api\/bookings\/[a-zA-Z0-9_-]+\/send-invoice/).reply(200, { message: 'Invoice sent' });
mock.onPost(/\/api\/bookings\/[a-zA-Z0-9_-]+\/send-quotation/).reply(200, { message: 'Quotation sent' });
mock.onPost(/\/api\/bookings\/[a-zA-Z0-9_-]+\/email-reply/).reply(200, { message: 'Reply email sent' });

// Valid minimal PDF Base64
const minimalPdfBase64 = "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLU31jBQsTAz1LBSK0osSQTzNjMxUrtAgFzBPEbcpM08hOD9XwS0zpwjI1tcvz0xRLk4tKstMTi0GihWUFmXmlWgARcoKSoF6uEIB8hE2mQplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjk0CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1BhcmVudCA0IDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pj4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgo0IDAgb2JqCjw8L1R5cGUvUGFnZXMvS2lkc1sxIDAgUl0vQ291bnQgMT4+CmVuZG9iagoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCgo3IDAgb2JqCjw8L0NyZWF0b3IoTW9jayBQREYgR2VuZXJhdG9yKS9Qcm9kdWNlcihNb2NrIFBERik+PgplbmRvYmoKCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE2MSAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAxNDEgMDAwMDAgbiAKMDAwMDAwMDI2NSAwMDAwMCBuIAowMDAwMDAwMzIyIDAwMDAwIG4gCjAwMDAwMDA0MTAgMDAwMDAgbiAKMDAwMDAwMDQ1OSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOC9Sb290IDYgMCBSL0luZm8gNyAwIFI+PgpzdGFydHhyZWYKNTQyCiUlRU9GCg==";
const pdfBytes = Uint8Array.from(atob(minimalPdfBase64), c => c.charCodeAt(0));
mock.onGet(/\/api\/bookings\/[a-zA-Z0-9_-]+\/invoice/).reply(200, new Blob([pdfBytes], { type: 'application/pdf' }));

mock.onPut(/\/api\/bookings\/cancel-by-ref\/[a-zA-Z0-9_-]+/).reply((config) => {
  const ref = config.url.split('/').pop();
  const booking = bookings.find(b => b.referenceNumber === ref);
  if (booking) {
    booking.status = 'Cancelled';
    localStorage.setItem('mockBookings', JSON.stringify(bookings));
    return [200, { message: 'Booking cancelled successfully' }];
  }
  return [404, { message: 'Booking not found' }];
});

// Admin endpoints (catch-all for missing mocks)
mock.onGet('/api/dashboard/stats').reply(() => {
  const dynamicStats = {
    ...dashboardStats,
    metrics: {
      ...dashboardStats.metrics,
      totalBookings: bookings.length
    },
    recentInquiries: [...bookings].reverse().slice(0, 5)
  };
  return [200, dynamicStats];
});

// Uploads
mock.onPost('/api/upload').reply((config) => {
  try {
    if (config.data && typeof config.data.get === 'function') {
      const file = config.data.get('image');
      if (file) {
        const url = URL.createObjectURL(file);
        return [200, { url }];
      }
    }
  } catch(e) {
    console.warn('Mock upload fallback triggered');
  }
  // Fallback to a random Unsplash placeholder if we can't extract the local file blob
  return [200, { url: 'https://images.unsplash.com/photo-1516222338250-863216ce01ea?q=80&w=600&auto=format&fit=crop' }];
});

// Allow any unmocked requests to pass through (e.g., local assets)
mock.onAny().passThrough();

export default mock;
