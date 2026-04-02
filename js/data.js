const INITIAL_SERVICES = [
  { id: 1, name: "Haircut", price: 35, category: "Hair", description: "Professional haircut tailored to your style.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Hair Spa", price: 50, category: "Hair", description: "Rejuvenating hair spa for smooth and silky hair.", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Facial", price: 40, category: "Skin", description: "Deep cleansing facial to refresh your skin.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Makeup", price: 80, category: "Beauty", description: "Flawless makeup application for any occasion.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Skincare", price: 60, category: "Skin", description: "Advanced skincare routines and treatments.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600" },
];

const INITIAL_GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800", alt: "Salon Interior" },
  { id: 2, url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800", alt: "Hair styling" },
  { id: 3, url: "https://images.unsplash.com/photo-1516975080661-4a25af9851f5?auto=format&fit=crop&q=80&w=800", alt: "Makeup products" },
  { id: 4, url: "https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?auto=format&fit=crop&q=80&w=800", alt: "Happy client" },
  { id: 5, url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800", alt: "Spa treatment" },
  { id: 6, url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800", alt: "Hair coloring" }
];

function initData() {
  if (!localStorage.getItem("services")) {
    localStorage.setItem("services", JSON.stringify(INITIAL_SERVICES));
  }
  if (!localStorage.getItem("gallery")) {
    localStorage.setItem("gallery", JSON.stringify(INITIAL_GALLERY));
  }
  if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify([]));
  }
  if (!localStorage.getItem("messages")) {
    localStorage.setItem("messages", JSON.stringify([]));
  }
}

// Ensure init is called
initData();

// Utility getters / setters
function getServices() {
  return JSON.parse(localStorage.getItem("services")) || [];
}
function setServices(services) {
  localStorage.setItem("services", JSON.stringify(services));
}

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}
function setBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function getGallery() {
  return JSON.parse(localStorage.getItem("gallery")) || [];
}
function setGallery(gallery) {
  localStorage.setItem("gallery", JSON.stringify(gallery));
}

function getMessages() {
  return JSON.parse(localStorage.getItem("messages")) || [];
}
function setMessages(messages) {
  localStorage.setItem("messages", JSON.stringify(messages));
}

// Generate unique ID helper
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}
