import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Camera, Calendar, User, Search, Menu, X, Star, Heart, 
  Share2, Compass, TrendingUp, Image as ImageIcon, Check, Smartphone, Award,
  ExternalLink, LogOut, ArrowLeft, ShieldCheck, Clock, Phone, Globe, Bookmark,
  Trophy, Settings, QrCode, Edit3, Power, Bell, Filter, MessageCircle, Navigation,
  Locate, Save, ArrowRight, Briefcase, Printer, Car, ShieldAlert, PhoneCall,
  CloudRain, CalendarDays, Info, Gift, ShoppingBag, Coins, Zap, PlusCircle,
  Map as MapIcon, Sun, DollarSign, Plane, Ticket
} from 'lucide-react';

// --- MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

/**
 * INITIAL DATA (Expanded Coverage)
 */
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🌴' },
  { id: 'experience', label: 'Experiences', icon: '🎨' },
  { id: 'transfers', label: 'Transfers', icon: '🚖' },
  { id: 'food', label: 'Eat & Drink', icon: '🍹' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'culture', label: 'Culture', icon: '🥁' },
  { id: 'stay', label: 'Stays', icon: '🏡' },
];

const REGIONS = [
  { id: 'all', label: 'All Island' },
  { id: 'montegobay', label: 'Montego Bay' },
  { id: 'kingston', label: 'Kingston' },
  { id: 'negril', label: 'Negril' },
  { id: 'ochorios', label: 'Ocho Rios' },
  { id: 'portantonio', label: 'Port Antonio' },
  { id: 'southcoast', label: 'South Coast' },
];

const SAFETY_ALERTS = [
  { id: 1, type: 'weather', text: "Afternoon showers expected in Portland. Drive carefully.", icon: <CloudRain size={14}/> },
  { id: 2, type: 'road', text: "Road work on North Coast Highway near Falmouth.", icon: <Info size={14}/> }
];

const STORIES = [
  { id: 1, user: "Ricks Cafe", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=200", text: "Sunset Live! 🎸" },
  { id: 2, user: "Blue Mtn", image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=200", text: "Harvest Day ☕" },
  { id: 3, user: "Boston Jerk", image: "https://images.unsplash.com/photo-1596450518334-111b7b4a899c?auto=format&fit=crop&q=80&w=200", text: "Fresh Off Grill 🔥" },
  { id: 4, user: "Bamboo Raft", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=200", text: "River Clear 🌊" },
];

const REWARDS = [
  { id: 1, title: "Free Blue Mountain Coffee", cost: 200, icon: "☕", desc: "Redeem at any partner café." },
  { id: 2, title: "10% Off Eco-Tours", cost: 400, icon: "🌿", desc: "Valid for hiking and rafting." },
  { id: 3, title: "Donate $10 to Recovery", cost: 500, icon: "❤️", desc: "We donate on your behalf." },
];

const INITIAL_LISTINGS = [
  {
    id: 4, 
    name: "Auntie V's Basket Weaving",
    category: 'experience',
    region: 'southcoast',
    rating: 5.0,
    reviews: 18,
    price: '$40',
    location: "Treasure Beach, St. Elizabeth",
    coordinates: [17.887, -77.771],
    image: "https://images.unsplash.com/photo-1605218427360-36390f8584af?auto=format&fit=crop&q=80&w=800",
    description: "Learn to weave traditional baskets with palm leaves under the mango tree.",
    full_bio: "I've been weaving since I was a little girl. Come sit on my porch, drink some lemongrass tea, and learn the art of Jamaican basketry. You take home whatever you make! This class supports the local women's weaving circle.",
    impact_score: 100,
    scout_verified: "Community Elder",
    amenities: ["2 Hours", "Materials Included", "Tea Served", "Family Friendly"],
    impact_badge: true,
    whatsapp: "18765559999",
    special_offer: null
  },
  {
    id: 0,
    name: "P&T MoBay Airport Transfer",
    category: 'transfers',
    region: 'montegobay',
    rating: 5.0,
    reviews: 42,
    price: '$30+',
    location: "Sangster Intl Airport (MBJ)",
    coordinates: [18.476, -77.92], 
    image: "https://images.unsplash.com/photo-1548625361-e88c7e928d36?q=80&w=800&auto=format&fit=crop", 
    description: "Private, AC transfers from MBJ to any hotel in Montego Bay or Negril.",
    full_bio: "Start your vacation the moment you land. No waiting on big buses. We track your flight and meet you with a Red Stripe and a smile. JTB Certified driver.",
    impact_score: 98,
    scout_verified: "Direct Partner",
    amenities: ["Private AC Vehicle", "Flight Tracking", "Grocery Stops", "JTB Certified"],
    impact_badge: true,
    whatsapp: "18764859759",
    special_offer: "Free Red Stripe on arrival"
  },
  {
    id: 5,
    name: "Kingston City Runner",
    category: 'transfers',
    region: 'kingston',
    rating: 4.9,
    reviews: 15,
    price: '$25+',
    location: "Norman Manley Intl (KIN)",
    coordinates: [17.936, -76.779],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    description: "Reliable airport pickup and city drops for business or leisure.",
    full_bio: "Expert navigation of Kingston traffic. Safe, reliable, and always on time for your flight.",
    impact_score: 90,
    scout_verified: "Sarah J.",
    amenities: ["Business Class", "Wifi in Car", "Receipts Available"],
    impact_badge: false,
    whatsapp: "18765551234",
    special_offer: null
  },
  {
    id: 1,
    name: "Mystic Mountain",
    category: 'adventure',
    region: 'ochorios',
    rating: 4.8,
    reviews: 1240,
    price: '$$',
    location: "Ocho Rios, St. Ann",
    coordinates: [18.405, -77.103],
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    description: "Zipline through the canopy and bobsled down the mountain.",
    full_bio: "Experience the rainforest from 700 feet up. Following Hurricane Melissa, we have replanted 500 trees and restored the bobsled track to be faster than ever.",
    impact_score: 95,
    scout_verified: "Sarah J.",
    amenities: ["Wifi", "Parking", "Food", "Guide"],
    impact_badge: true,
    whatsapp: "18765550001",
    special_offer: "10% off groups of 4+"
  },
  {
    id: 2,
    name: "Scotchies Jerk Center",
    category: 'food',
    region: 'montegobay',
    rating: 4.9,
    reviews: 3500,
    price: '$',
    location: "Montego Bay, St. James",
    coordinates: [18.504, -77.896],
    image: "https://images.unsplash.com/photo-1596450518334-111b7b4a899c?auto=format&fit=crop&q=80&w=800",
    description: "The authentic jerk experience. Wood fire smoked chicken and pork.",
    full_bio: "We are the heart of MoBay. Our pits are hot and our roof is fixed. We source all our peppers from local farmers affected by the storm.",
    impact_score: 88,
    scout_verified: "Devon B.",
    amenities: ["Outdoor Seating", "Takeout", "Bar"],
    impact_badge: false,
    whatsapp: "18765550002",
    special_offer: null
  },
  {
    id: 3,
    name: "Bob Marley Museum",
    category: 'culture',
    region: 'kingston',
    rating: 4.7,
    reviews: 2100,
    price: '$$$',
    location: "Kingston 6",
    coordinates: [18.019, -76.783],
    image: "https://images.unsplash.com/photo-1550418290-b8d86e8a8b1c?auto=format&fit=crop&q=80&w=800",
    description: "The former home and studio of the reggae legend.",
    full_bio: "Walk through the life of a legend. We are fully open and accepting visitors. Proceeds help the Tuff Gong Foundation repair local schools.",
    impact_score: 98,
    scout_verified: "Rita M.",
    amenities: ["Gift Shop", "Tour Guide", "Café"],
    impact_badge: true,
    whatsapp: "18765550003",
    special_offer: null
  },
  {
    id: 6,
    name: "Rick's Cafe",
    category: 'food',
    region: 'negril',
    rating: 4.6,
    reviews: 5400,
    price: '$$',
    location: "West End, Negril",
    coordinates: [18.250, -78.366],
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    description: "World famous sunset bar and cliff diving.",
    full_bio: "The best sunset view in the world. Come for the diving, stay for the vibes. We are fully operational after the storm.",
    impact_score: 85,
    scout_verified: "Mike T.",
    amenities: ["Live Music", "Cliff Diving", "Pool", "Bar"],
    impact_badge: false,
    whatsapp: "18765550006",
    special_offer: null
  },
  {
    id: 7,
    name: "Blue Lagoon Tours",
    category: 'adventure',
    region: 'portantonio',
    rating: 4.8,
    reviews: 890,
    price: '$$',
    location: "Port Antonio, Portland",
    coordinates: [18.170, -76.388],
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
    description: "Swim in the mix of fresh and saltwater in the mystical lagoon.",
    full_bio: "A natural wonder. We offer guided raft tours and snorkeling. The surrounding jungle is lush and recovering beautifully.",
    impact_score: 96,
    scout_verified: "Jason L.",
    amenities: ["Rafting", "Swimming", "Guide"],
    impact_badge: true,
    whatsapp: "18765550007",
    special_offer: null
  }
];

const STAMPS = [
  { id: 1, name: "Rebuild Hero", icon: "🏗️", date: "Oct 24", earned: true },
  { id: 2, name: "Foodie", icon: "🍗", date: "Oct 25", earned: true },
  { id: 3, name: "Explorer", icon: "🗺️", date: null, earned: false },
  { id: 4, name: "Volunteer", icon: "❤️", date: null, earned: false },
];

const MOCK_REVIEWS = [
  { id: 1, user: "Sarah J.", text: "The view was insane! And knowing my money helps the school next door made it even better.", rating: 5, date: "2 days ago" },
  { id: 2, user: "Mike T.", text: "Authentic vibes. The owner is super friendly.", rating: 4, date: "1 week ago" },
];

// --- HELPER: CREATE EMOJI ICONS ---
const createEmojiIcon = (category) => {
  const cat = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
  return L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-10 h-10 bg-white rounded-full shadow-lg border-2 border-white flex items-center justify-center text-xl transform hover:scale-110 transition-transform">${cat.icon}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// --- SUB-COMPONENTS ---

const ViewToggle = ({ mode, setMode }) => (
  <div className="fixed top-20 right-4 z-[1000] bg-white/90 backdrop-blur rounded-full p-1 border border-neutral-200 shadow-lg flex">
    <button onClick={() => setMode('traveler')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'traveler' ? 'bg-teal-600 text-white shadow-md' : 'text-neutral-500'}`}>Traveler</button>
    <button onClick={() => setMode('business')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'business' ? 'bg-orange-500 text-white shadow-md' : 'text-neutral-500'}`}>Owner</button>
  </div>
);

// Map Component to Handle "Locate Me"
const LocationMarker = () => {
  const map = useMap();
  
  const handleLocate = () => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, 13);
      L.marker(e.latlng, {
        icon: L.divIcon({
          className: 'user-loc',
          html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md ring-4 ring-blue-500/30"></div>'
        })
      }).addTo(map);
    });
  };

  return (
    <button 
      onClick={handleLocate}
      className="absolute bottom-20 right-4 z-[1000] bg-white p-3 rounded-full shadow-xl text-neutral-700 hover:text-blue-600 active:scale-90 transition-transform"
    >
      <Locate size={24} />
    </button>
  );
};

const SafetyModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-200">
    <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white">
      <X size={32} />
    </button>
    
    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
      <ShieldAlert size={48} className="text-white" />
    </div>
    
    <h2 className="text-3xl font-bold text-white mb-2">Safety Center</h2>
    <p className="text-white/60 mb-8 text-center max-w-xs">Quick access to emergency services and official updates.</p>
    
    <div className="w-full max-w-sm space-y-4">
      {/* NEW: Visit Jamaica Official Alert Link */}
      <a 
        href="https://www.visitjamaica.com/travel-alerts/tours-attractions-reopenings/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-teal-600 text-white p-5 rounded-2xl shadow-lg active:scale-95 transition-transform border border-teal-400/30"
      >
        <div className="flex items-center gap-4">
          <div className="bg-teal-500 p-2 rounded-full"><Globe size={24}/></div>
          <div className="text-left">
            <div className="font-bold text-lg">Official Travel Alerts</div>
            <div className="text-xs opacity-80">VisitJamaica.com (Opens new tab)</div>
          </div>
        </div>
        <ArrowRight size={20} />
      </a>

      <a href="tel:119" className="flex items-center justify-between bg-white text-red-600 p-5 rounded-2xl shadow-lg active:scale-95 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-2 rounded-full"><PhoneCall size={24}/></div>
          <div className="text-left">
            <div className="font-bold text-lg">Call Police</div>
            <div className="text-xs opacity-70">Emergency: 119</div>
          </div>
        </div>
        <ArrowRight size={20} />
      </a>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 mt-8">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <Car size={18} className="text-teal-400"/> Verify Driver
        </h3>
        <p className="text-slate-400 text-xs mb-3">Enter the 4-digit ID found on the taxi window sticker.</p>
        <div className="flex gap-2">
          <input type="text" placeholder="ID #" className="bg-slate-900 text-white border border-slate-600 rounded-xl px-4 py-3 w-full font-mono tracking-widest text-center focus:outline-none focus:border-teal-500" />
          <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold">Verify</button>
        </div>
      </div>
    </div>
  </div>
);

// --- NEW COMPONENT: TRIP PLANNER ---
const TripPlanner = ({ listings }) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateTrip = () => {
    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setTrip({
        name: "Eco-Discovery Weekend",
        totalCost: "$120",
        days: [
          {
            day: 1,
            title: "Mountain & Mist",
            activities: [
              listings.find(l => l.name.includes("Blue Mtn")) || listings[2], // Fallback
              listings.find(l => l.name.includes("Mystic")) || listings[2]
            ]
          },
          {
            day: 2,
            title: "Culture & Craft",
            activities: [
              listings.find(l => l.name.includes("Basket")) || listings[0],
              listings.find(l => l.name.includes("Marley")) || listings[4]
            ]
          }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  if (!trip) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <MapIcon size={40} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Trip Genie 🧞‍♂️</h2>
        <p className="text-slate-500 mb-8 max-w-xs">Tell us your vibe, and we'll build a perfect itinerary supporting local businesses.</p>
        
        <button 
          onClick={generateTrip}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {loading ? (
            <span className="animate-pulse">Consulting the Spirits...</span>
          ) : (
            <>
              <Zap size={20} className="fill-yellow-400 text-yellow-400" />
              Generate 2-Day Eco Trip
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{trip.name}</h2>
          <p className="text-teal-600 font-medium text-sm">Est. Cost: {trip.totalCost}</p>
        </div>
        <button onClick={() => setTrip(null)} className="text-xs font-bold text-slate-400 underline">Reset</button>
      </div>

      <div className="space-y-6">
        {trip.days.map((day, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-teal-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 ring-4 ring-white"></div>
            <h3 className="font-bold text-lg text-slate-800 mb-1">Day {day.day}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-4">{day.title}</p>
            
            <div className="space-y-3">
              {day.activities.filter(Boolean).map((act, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                    <img src={act.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{act.name}</h4>
                    <span className="text-xs text-slate-500">{act.category} • {act.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={18} /> Save Itinerary
      </button>
    </div>
  );
};

// --- NEW COMPONENT: CREATE LISTING ---
const CreateListingModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'experience',
    description: '',
    price: '',
    whatsapp: '',
    amenities: ''
  });

  const handleSubmit = () => {
    const newListing = {
      id: Date.now(), // Random ID
      ...formData,
      rating: 5.0,
      reviews: 0,
      location: "New Location",
      coordinates: [18.405, -77.103], // Default to center of island
      image: "https://images.unsplash.com/photo-1596450518334-111b7b4a899c?auto=format&fit=crop&q=80&w=800", // Placeholder
      amenities: formData.amenities.split(',').map(s => s.trim()),
      impact_score: 100,
      impact_badge: true,
      scout_verified: "Pending",
      region: "montegobay" // Default for now
    };
    onSave(newListing);
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 h-[85vh] sm:h-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-orange-600">New Offering</h2>
          <button onClick={onClose} className="p-2 bg-neutral-100 rounded-full"><X size={20}/></button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Title</label>
            <input 
              type="text" 
              placeholder="e.g. Sunset Yoga"
              className="w-full p-3 border rounded-xl mt-1 font-bold"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Type</label>
            <select 
              className="w-full p-3 border rounded-xl mt-1 bg-white"
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Price</label>
            <input 
              type="text" 
              placeholder="$50"
              className="w-full p-3 border rounded-xl mt-1"
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Description</label>
            <textarea 
              placeholder="Tell us what makes this special..."
              className="w-full p-3 border rounded-xl mt-1 text-sm h-24"
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 shadow-lg hover:bg-orange-700"
          >
            <PlusCircle size={18} /> Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
};

const EditListingModal = ({ listing, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...listing });

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 h-[85vh] sm:h-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Listing</h2>
          <button onClick={onClose} className="p-2 bg-neutral-100 rounded-full"><X size={20}/></button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Business Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded-xl mt-1 font-bold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border rounded-xl mt-1 bg-white"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Description</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-xl mt-1 text-sm h-24"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">Special Offer</label>
            <input 
              type="text" 
              placeholder="e.g. Free Drink with Entry"
              value={formData.special_offer || ''} 
              onChange={e => setFormData({...formData, special_offer: e.target.value})}
              className="w-full p-3 border border-orange-200 bg-orange-50 rounded-xl mt-1 text-sm font-medium text-orange-900"
            />
          </div>
          <button 
            onClick={() => onSave(formData)}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailView = ({ item, onBack, isSaved, onToggleSave, onCheckIn }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [booked, setBooked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleBooking = () => {
    setBooked(true);
    let message = `Hi ${item.name}, I saw you on DiscoverJA! I'm interested in booking.`;
    
    if (selectedDate) {
      message += ` I'm looking at ${selectedDate}.`;
    }

    const url = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${item.name} on DiscoverJA`,
          text: item.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert("Link copied to clipboard!");
    }
  };

  const handleCheckInClick = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      onCheckIn(item.id);
    }
  };

  // Generate next 5 days for date picker
  const nextDays = Array.from({length: 5}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      full: d.toLocaleDateString()
    };
  });

  return (
    <div className="bg-white min-h-screen pb-32 animate-in slide-in-from-bottom-4 duration-300 relative z-[2000]">
      {/* Hero Header */}
      <div className="relative h-72 w-full">
        <img src={item.image} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
              <Share2 size={24} />
            </button>
            <button onClick={() => onToggleSave(item.id)} className={`p-2 backdrop-blur-md rounded-full transition-colors ${isSaved ? 'bg-white text-red-500' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'}`}>
              <Heart size={24} className={isSaved ? "fill-current" : ""} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24 text-white">
          <h1 className="text-3xl font-bold mb-1">{item.name}</h1>
          <div className="flex items-center text-sm opacity-90">
             <MapPin size={14} className="mr-1" /> {item.location}
          </div>
        </div>
      </div>

      <div className="p-6">
        
        {/* CHECK-IN BUTTON */}
        <button 
          onClick={handleCheckInClick}
          disabled={checkedIn}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mb-6 shadow-md transition-all ${checkedIn ? 'bg-green-100 text-green-700' : 'bg-teal-600 text-white active:scale-95'}`}
        >
          {checkedIn ? (
            <> <Check size={20} /> Checked In (+10 pts) </>
          ) : (
            <> <MapPin size={20} /> Check In Here </>
          )}
        </button>

        {/* Verification Badge */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex flex-col items-center text-center space-y-2 mb-6">
          <ShieldCheck className="text-teal-600" size={32} />
          <div>
            <h3 className="font-bold text-teal-900 text-sm">Verified Open</h3>
            <p className="text-teal-700 text-xs">Confirmed by Scout <strong>{item.scout_verified}</strong></p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-100 mb-6">
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'about' ? 'text-teal-600 border-teal-600' : 'text-neutral-400 border-transparent'}`}
          >
            About
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'reviews' ? 'text-teal-600 border-teal-600' : 'text-neutral-400 border-transparent'}`}
          >
            Reviews ({item.reviews})
          </button>
        </div>

        {activeTab === 'about' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
               <div className="flex justify-between items-end mb-2">
                 <h3 className="font-bold text-neutral-800">Impact Score</h3>
                 <span className="text-teal-600 font-bold text-xl">{item.impact_score}/100</span>
               </div>
               <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-teal-400 to-green-500 h-full rounded-full" style={{ width: `${item.impact_score}%` }}></div>
               </div>
               <p className="text-xs text-neutral-500 mt-2">High impact: This business directly funds local recovery.</p>
            </div>

            {/* EXPERIENCE DATE PICKER */}
            {item.category === 'experience' && (
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center"><CalendarDays size={18} className="mr-2 text-teal-600"/> Availability</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {nextDays.map((day, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(day.full)}
                      className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${selectedDate === day.full ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-neutral-100 bg-white text-neutral-500'}`}
                    >
                      <span className="text-xs font-bold uppercase">{day.day}</span>
                      <span className="text-xl font-bold">{day.date}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-lg mb-2">Our Story</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{item.full_bio}</p>
            </div>

            <div>
               <h3 className="font-bold text-lg mb-3">
                 {item.category === 'experience' ? 'Class Details' : 'Amenities'}
               </h3>
               <div className="flex flex-wrap gap-2">
                 {item.amenities.map(tag => (
                   <span key={tag} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-full flex items-center">
                     {item.category === 'experience' ? <Clock size={12} className="mr-1.5 text-orange-600"/> : <Check size={12} className="mr-1.5 text-green-600" />}
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} className="bg-neutral-50 p-4 rounded-xl">
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">{review.user}</span>
                    <span className="text-xs text-neutral-400">{review.date}</span>
                 </div>
                 <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "fill-current" : "text-neutral-300"} />
                    ))}
                 </div>
                 <p className="text-sm text-neutral-600">"{review.text}"</p>
              </div>
            ))}
            <button className="w-full py-3 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600">Write a Review</button>
          </div>
        )}
      </div>

      {/* Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-neutral-200 z-[2000] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
         <div className="max-w-md mx-auto">
            {booked ? (
              <div className="bg-green-100 text-green-800 p-3 rounded-xl text-center font-bold flex flex-col items-center border border-green-200">
                 <div className="flex items-center gap-2">
                   <Check size={20} />
                   <span>WhatsApp Opened!</span>
                 </div>
                 <span className="text-[10px] font-normal opacity-80">Check your other tab to chat.</span>
              </div>
            ) : (
              <button 
                onClick={handleBooking}
                className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex justify-center items-center hover:bg-[#20bd5a]"
              >
                <Phone size={20} className="mr-2" />
                {item.category === 'experience' ? 'Request Class Spot' : 'Book via WhatsApp'}
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

// --- NEW COMPONENT: LANDING / GATEWAY ---
const LandingPage = ({ onSelectRole }) => {
  return (
    <div className="fixed inset-0 z-[5000] bg-teal-700 text-white flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-lg border border-white/20 shadow-2xl rotate-3">
            <Compass size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Discover<span className="text-teal-200">JA</span></h1>
          <p className="text-teal-100/80 mb-12 max-w-xs text-sm font-medium">
            Explore authentic Jamaica while helping our communities rebuild and thrive.
          </p>

          <div className="w-full max-w-xs space-y-4">
            <button 
              onClick={() => onSelectRole('traveler')}
              className="w-full bg-white text-teal-900 p-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full"><Compass size={20} className="text-teal-700"/></div>
                <span>I'm a Traveler</span>
              </div>
              <ArrowRight size={20} className="text-teal-300 group-hover:text-teal-700 transition-colors" />
            </button>

            <button 
              onClick={() => onSelectRole('business')}
              className="w-full bg-teal-800/50 border border-teal-600/50 text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-between hover:bg-teal-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-900 rounded-full"><Briefcase size={20} className="text-teal-200"/></div>
                <span>I Own a Business</span>
              </div>
              <ArrowRight size={20} className="text-teal-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 text-center">
        <p className="text-[10px] text-teal-300/60 uppercase tracking-widest font-bold">Made with ❤️ for Jamaica</p>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const App = () => {
  // APP STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('traveler'); // 'traveler' or 'business'
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  
  // NAVIGATION STATE
  const [activeTab, setActiveTab] = useState('discover');
  
  // DATA STATE - NOW WITH LOCAL STORAGE PERSISTENCE
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('discoverja_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [savedIds, setSavedIds] = useState(() => {
    const saved = localStorage.getItem('discoverja_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('discoverja_points');
    return saved ? parseInt(saved) : 150;
  });

  // PERSISTENCE EFFECTS
  useEffect(() => { localStorage.setItem('discoverja_listings', JSON.stringify(listings)); }, [listings]);
  useEffect(() => { localStorage.setItem('discoverja_saved', JSON.stringify(savedIds)); }, [savedIds]);
  useEffect(() => { localStorage.setItem('discoverja_points', points.toString()); }, [points]);

  const [selectedListing, setSelectedListing] = useState(null);
  
  // User State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRegion, setActiveRegion] = useState('all'); // Region Filter

  // Business Owner State
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // --- HANDLERS ---

  const handleRoleSelection = (selectedRole) => {
    setMode(selectedRole);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setMode('traveler');
    setActiveTab('discover');
  };

  // Toggle Favorites
  const toggleSave = (id) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(itemId => itemId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const redeemReward = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
      alert("Reward Redeemed! Show this to the cashier.");
    } else {
      alert("Not enough points! Visit more places to earn stamps.");
    }
  };

  const handleCheckIn = (id) => {
    setPoints(points + 10);
    alert("Check-in confirmed! You earned 10 Points.");
  };

  // Filter Logic
  const filteredListings = listings.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesRegion = activeRegion === 'all' || (item.region && item.region === activeRegion);
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(query) || 
                          item.location.toLowerCase().includes(query) ||
                          item.description.toLowerCase().includes(query) ||
                          item.category.toLowerCase().includes(query);
    
    return matchesCategory && matchesRegion && matchesSearch;
  });

  // Get Saved Listings for Profile
  const savedListingsData = listings.filter(item => savedIds.includes(item.id));

  // Handle Edit Save
  const handleEditSave = (updatedListing) => {
    const updatedListings = listings.map(l => l.id === updatedListing.id ? updatedListing : l);
    setListings(updatedListings);
    setShowEditModal(false);
  };

  // Handle Create Listing
  const handleCreateSave = (newListing) => {
    setListings([...listings, newListing]);
    setShowCreateModal(false);
    alert("Listing Created! Switch to 'Traveler' mode to see it.");
  };

  // --- RENDER ---

  if (!isAuthenticated) {
    return <LandingPage onSelectRole={handleRoleSelection} />;
  }

  // 2. BUSINESS OWNER VIEW
  if (mode === 'business') {
    const myListing = listings[0]; 

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 animate-in fade-in duration-300">
        <header className="bg-white px-6 pt-6 pb-8 border-b border-slate-200 rounded-b-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Command Center</h1>
            <div className="flex items-center gap-3">
               <button onClick={handleSignOut} className="text-xs font-bold text-slate-400 hover:text-red-500">Sign Out</button>
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border-2 border-orange-50">JB</div>
            </div>
          </div>

          <div className={`p-1 rounded-2xl flex items-center justify-between border transition-colors ${isBusinessOpen ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
             <div className="flex items-center px-4 py-3">
               <div className={`w-3 h-3 rounded-full mr-3 ${isBusinessOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
               <div>
                 <div className="text-xs font-bold uppercase tracking-wide opacity-60">Current Status</div>
                 <div className="font-bold text-lg">{isBusinessOpen ? 'Open for Business' : 'Currently Closed'}</div>
               </div>
             </div>
             <button 
               onClick={() => setIsBusinessOpen(!isBusinessOpen)}
               className="bg-white shadow-sm p-3 rounded-xl m-1 hover:bg-slate-50 transition-colors"
             >
               <Power size={20} className={isBusinessOpen ? 'text-green-600' : 'text-red-600'} />
             </button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
             <div className="w-16 h-16 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
               <img src={myListing.image} className="w-full h-full object-cover" />
             </div>
             <div>
               <h3 className="font-bold">{myListing.name}</h3>
               <p className="text-xs text-slate-500 line-clamp-2">{myListing.description}</p>
             </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowQR(true)}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:shadow-md transition-all active:scale-95"
              >
                <QrCode className="text-orange-500" size={28} />
                <span className="text-sm font-bold">Show QR Code</span>
              </button>
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="p-4 bg-orange-600 text-white rounded-2xl border border-orange-700 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-orange-700 hover:shadow-md transition-all active:scale-95"
              >
                <PlusCircle className="text-white" size={28} />
                <span className="text-sm font-bold">New Listing</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h3 className="font-bold text-slate-800 flex items-center"><Bell size={16} className="mr-2 text-orange-500"/> Today's Flash Offer</h3>
               <button 
                 onClick={() => setShowEditModal(true)}
                 className="text-xs text-teal-600 font-bold underline"
               >
                 Edit
               </button>
             </div>
             <div className="bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-700">
               {myListing.special_offer || "No active offer. Click Edit to add one!"}
             </div>
          </div>

          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Recovery Badge</h3>
               <p className="text-slate-300 text-sm mb-4">You are verified as a Founding Member.</p>
               <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold">View Certificate</button>
             </div>
             <Award className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
          </section>
        </main>

        {showQR && (
          <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShowQR(false)}>
             <div className="bg-white w-full max-w-sm rounded-3xl p-0 overflow-hidden relative animate-in zoom-in-50 duration-200" onClick={e => e.stopPropagation()}>
                <div className="bg-slate-900 p-8 text-center text-white relative">
                   <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl border-4 border-teal-500 shadow-lg">JA</div>
                   <h3 className="text-2xl font-bold mb-1">SCAN ME</h3>
                   <p className="text-slate-400 text-xs mb-6 uppercase tracking-widest">Verified Tour Driver</p>
                   <div className="bg-white p-4 rounded-xl mb-2 inline-block">
                      <QrCode size={140} className="text-black" />
                   </div>
                   <p className="text-xs text-slate-500">DiscoverJA.com/driver/123</p>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                   <h4 className="font-bold text-slate-800 mb-2 flex items-center"><Car size={16} className="mr-2"/> Driver Kit</h4>
                   <p className="text-xs text-slate-500 mb-4">Print this and stick it to your passenger window or headrest.</p>
                   <div className="grid grid-cols-2 gap-3">
                     <button className="py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-slate-100">
                       <Printer size={16} className="mr-2" /> Print PDF
                     </button>
                     <button onClick={() => setShowQR(false)} className="py-3 bg-black text-white rounded-xl text-xs font-bold">
                       Done
                     </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {showEditModal && (
          <EditListingModal 
            listing={myListing} 
            onClose={() => setShowEditModal(false)} 
            onSave={handleEditSave} 
          />
        )}

        {showCreateModal && (
          <CreateListingModal 
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreateSave}
          />
        )}
      </div>
    );
  }

  // 3. TRAVELER VIEW
  
  if (selectedListing) {
    return (
      <DetailView 
        item={selectedListing} 
        onBack={() => setSelectedListing(null)} 
        isSaved={savedIds.includes(selectedListing.id)}
        onToggleSave={toggleSave}
        onCheckIn={handleCheckIn}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 pb-24 animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-[900] px-4 py-3 flex items-center justify-between border-b border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">J</div>
          <span className="font-bold text-lg tracking-tight">Discover<span className="text-teal-600">JA</span></span>
        </div>
        
        {/* ALERT BUTTONS */}
        <div className="flex gap-2">
          <button className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-black">
            <Bell size={18} />
          </button>
          <button 
            onClick={() => setShowSafetyModal(true)}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100"
          >
            <ShieldAlert size={14} /> Safety
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        
        {/* LIVE ALERT TICKER */}
        <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center gap-3 shadow-md overflow-hidden relative">
           <div className="bg-red-500 p-1.5 rounded-lg animate-pulse"><ShieldAlert size={14} className="text-white"/></div>
           <div className="flex-1 overflow-hidden">
             <div className="text-xs font-bold flex gap-4 animate-marquee whitespace-nowrap">
               {SAFETY_ALERTS.map(alert => (
                 <span key={alert.id} className="flex items-center gap-2">
                   {alert.icon} {alert.text}
                 </span>
               ))}
             </div>
           </div>
        </div>

        {/* --- DISCOVER TAB --- */}
        {activeTab === 'discover' && (
          <>
            {/* ISLAND STORIES */}
            <div>
              <h3 className="font-bold text-sm text-slate-500 mb-3 uppercase tracking-wide">Live on Island</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {STORIES.map(story => (
                  <div key={story.id} className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-red-500">
                      <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                        <img src={story.image} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-center leading-tight max-w-[60px]">{story.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <section className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-neutral-800">Wah Gwaan, <br/><span className="text-teal-600">Ready to explore?</span></h1>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-neutral-400" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'Jerk' or 'Kingston'..." 
                  className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl shadow-sm border border-neutral-200 focus:outline-none focus:border-teal-500" 
                />
              </div>
              
              {/* CATEGORY FILTER */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm whitespace-nowrap active:scale-95 transition-all
                      ${activeCategory === cat.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-neutral-200 text-neutral-700'}
                    `}
                  >
                    <span>{cat.icon}</span><span className="font-bold text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* NEW: REGION FILTER */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-neutral-100/50">
                {REGIONS.map(reg => (
                  <button 
                    key={reg.id} 
                    onClick={() => setActiveRegion(reg.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                      ${activeRegion === reg.id ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}
                    `}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-neutral-800">Support Recovery ❤️</h2>
                {activeCategory !== 'all' && (
                   <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">Filtering by {CATEGORIES.find(c => c.id === activeCategory)?.label}</span>
                )}
              </div>
              
              {filteredListings.length > 0 ? (
                <div className="space-y-4">
                  {filteredListings.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedListing(item)}
                      className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform animate-in fade-in slide-in-from-bottom-2 duration-300 relative"
                    >
                      <div className="h-48 bg-neutral-200 relative">
                        <img src={item.image} className="w-full h-full object-cover"/>
                        {item.impact_badge && (
                          <div className="absolute bottom-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">REBUILDING PARTNER</div>
                        )}
                        {item.special_offer && (
                          <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm animate-pulse flex items-center">
                            <Ticket size={10} className="mr-1"/> DEAL
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center shadow-sm">
                          <Star size={12} className="text-yellow-500 fill-current mr-1" /> {item.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-neutral-800 mb-1">{item.name}</h3>
                          {item.special_offer && <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Offer</span>}
                        </div>
                        <div className="flex items-center text-neutral-500 text-xs mb-3">
                           <MapPin size={12} className="mr-1" /> {item.location}
                        </div>
                        {item.special_offer && (
                          <p className="text-xs font-bold text-orange-600 mb-2">🔥 {item.special_offer}</p>
                        )}
                        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                          <span className="text-sm font-bold text-neutral-900">{item.price}</span>
                          <span className="text-teal-600 text-sm font-bold flex items-center">View Details <ArrowLeft size={16} className="rotate-180 ml-1"/></span>
                        </div>
                      </div>
                      {savedIds.includes(item.id) && (
                        <div className="absolute top-3 left-3 bg-white p-1.5 rounded-full shadow-md z-10" style={{top: '3rem'}}>
                          <Heart size={14} className="fill-red-500 text-red-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 opacity-60">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🧐</div>
                  <h3 className="font-bold text-lg">No places found</h3>
                  <p className="text-sm">Try searching for something else or clear your filters.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('all'); setActiveRegion('all');}}
                    className="mt-4 text-teal-600 font-bold text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* --- MAP TAB --- */}
        {activeTab === 'map' && (
          <div className="h-[75vh] w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative z-0">
             {/* Note: We use filteredListings here so the map updates with search */}
             <MapContainer center={[18.1096, -77.2975]} zoom={9} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <LocationMarker />

                {filteredListings.map(item => (
                   <Marker 
                     key={item.id} 
                     position={item.coordinates}
                     icon={createEmojiIcon(item.category)}
                   >
                      <Popup>
                         <div className="p-1 text-center">
                            <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                            <button 
                              onClick={() => setSelectedListing(item)}
                              className="text-xs bg-teal-600 text-white px-2 py-1 rounded"
                            >
                              View
                            </button>
                         </div>
                      </Popup>
                   </Marker>
                ))}
             </MapContainer>
             
             {/* Floating Search in Map Mode */}
             <div className="absolute top-4 left-4 right-4 z-[1000]">
               <div className="relative shadow-lg">
                  <Search className="absolute left-4 top-3.5 text-neutral-500" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter map..." 
                    className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none" 
                  />
               </div>
             </div>

             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-lg z-[1000]">
                Showing {filteredListings.length} Verified Locations
             </div>
          </div>
        )}

        {/* --- TRIPS TAB (NEW) --- */}
        {activeTab === 'trips' && (
          <TripPlanner listings={listings} />
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
             <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-neutral-200 rounded-full border-4 border-white shadow-md overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover"/>
                </div>
                <div>
                   <h2 className="text-2xl font-bold">Jamie S.</h2>
                   <div className="flex items-center text-teal-600 font-bold text-sm bg-teal-50 px-2 py-1 rounded-md inline-block mt-1">
                      <Award size={14} className="mr-1" /> Level 2 Scout
                   </div>
                </div>
             </div>

             {/* REWARDS STORE */}
             <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex justify-between items-center mb-6">
                     <div>
                       <h3 className="font-bold text-lg flex items-center"><Gift size={18} className="mr-2 text-teal-400" /> Rewards Bazaar</h3>
                       <p className="text-xs text-slate-400">Redeem your stamps for real perks.</p>
                     </div>
                     <div className="bg-white/10 px-3 py-1.5 rounded-lg flex items-center">
                       <Coins size={14} className="mr-2 text-yellow-400"/>
                       <span className="font-bold">{points} pts</span>
                     </div>
                   </div>

                   <div className="space-y-3">
                     {REWARDS.map(reward => (
                       <div key={reward.id} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">{reward.icon}</div>
                           <div>
                             <div className="font-bold text-sm">{reward.title}</div>
                             <div className="text-[10px] text-slate-400">{reward.desc}</div>
                           </div>
                         </div>
                         <button 
                           onClick={() => redeemReward(reward.cost)}
                           className="bg-teal-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-500"
                         >
                           {reward.cost} pts
                         </button>
                       </div>
                     ))}
                   </div>
                </div>
             </div>

             <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="font-bold text-lg mb-4 flex items-center"><Trophy size={18} className="mr-2" /> Digital Passport</h3>
                   <div className="grid grid-cols-4 gap-2">
                      {STAMPS.map(stamp => (
                        <div key={stamp.id} className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 ${stamp.earned ? 'bg-white/20 border-white/40' : 'bg-black/20 border-white/10 opacity-50'}`}>
                           <span className="text-xl mb-1">{stamp.icon}</span>
                        </div>
                      ))}
                   </div>
                   <p className="text-xs text-center mt-4 opacity-80 font-medium">Visit 2 more locations to unlock "Explorer"!</p>
                </div>
             </div>

             <div>
               <h3 className="font-bold text-lg mb-4 flex items-center"><Bookmark size={18} className="mr-2" /> Saved Places</h3>
               
               {savedListingsData.length > 0 ? (
                 <div className="space-y-3">
                   {savedListingsData.map(item => (
                     <div key={item.id} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                           <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-sm">{item.name}</h4>
                           <span className="text-xs text-neutral-500">{item.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-red-500 p-2 bg-red-50 rounded-lg" onClick={() => toggleSave(item.id)}>
                            <Heart size={16} className="fill-current"/>
                          </button>
                          <button className="text-teal-600 font-bold text-xs p-2 bg-teal-50 rounded-lg" onClick={() => setSelectedListing(item)}>View</button>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-8 bg-neutral-50 rounded-xl border border-dashed border-neutral-300">
                   <Heart className="mx-auto text-neutral-300 mb-2" size={32} />
                   <p className="text-sm text-neutral-500">No saved places yet.</p>
                   <button onClick={() => setActiveTab('discover')} className="text-teal-600 text-xs font-bold mt-2">Go Explore</button>
                 </div>
               )}
             </div>
             
             <div className="pt-4 space-y-3">
               <button onClick={() => {
                 localStorage.clear();
                 window.location.reload();
               }} className="w-full py-3 border border-red-200 text-red-500 text-sm font-bold flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors">
                 Reset Demo Data
               </button>
               
               <button onClick={handleSignOut} className="w-full py-4 text-neutral-400 text-sm font-bold flex items-center justify-center hover:text-red-500 transition-colors">
                 <LogOut size={16} className="mr-2" /> Sign Out
               </button>
             </div>
          </div>
        )}

      </main>

      {/* GLOBAL SAFETY MODAL */}
      {showSafetyModal && <SafetyModal onClose={() => setShowSafetyModal(false)} />}

      <nav className="fixed bottom-0 w-full bg-white border-t border-neutral-200 pb-6 pt-2 px-6 z-[1000]">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {['discover', 'map', 'trips', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab ? 'text-teal-600' : 'text-neutral-400'}`}>
              <div className="w-6 h-6 flex items-center justify-center">
                 {tab === 'discover' && <Compass size={24} className={activeTab === tab ? 'fill-current' : ''} />}
                 {tab === 'map' && <MapPin size={24} className={activeTab === tab ? 'fill-current' : ''} />}
                 {tab === 'trips' && <Calendar size={24} className={activeTab === tab ? 'fill-current' : ''} />}
                 {tab === 'profile' && <User size={24} className={activeTab === tab ? 'fill-current' : ''} />}
              </div>
              <span className="text-[10px] font-bold capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
