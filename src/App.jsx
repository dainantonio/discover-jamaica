import React, { useState } from 'react';
import { 
  MapPin, Camera, Calendar, User, Search, Menu, X, Star, Heart, 
  Share2, Compass, TrendingUp, Image as ImageIcon, Check, Smartphone, Award,
  ExternalLink, LogOut, ArrowLeft, ShieldCheck, Clock, Phone, Globe, Bookmark,
  Trophy, Settings, QrCode, Edit3, Power, Bell, Filter
} from 'lucide-react';

// --- MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * MOCK DATABASE
 */
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🌴' },
  { id: 'food', label: 'Eat & Drink', icon: '🍹' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'culture', label: 'Culture', icon: '🥁' },
  { id: 'stay', label: 'Stays', icon: '🏡' },
];

const LISTINGS = [
  {
    id: 1,
    name: "Mystic Mountain",
    category: 'adventure',
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
    whatsapp: "18765550001"
  },
  {
    id: 2,
    name: "Scotchies Jerk Center",
    category: 'food',
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
    whatsapp: "18765550002"
  },
  {
    id: 3,
    name: "Bob Marley Museum",
    category: 'culture',
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
    whatsapp: "18765550003"
  }
];

const STAMPS = [
  { id: 1, name: "Rebuild Hero", icon: "🏗️", date: "Oct 24", earned: true },
  { id: 2, name: "Foodie", icon: "🍗", date: "Oct 25", earned: true },
  { id: 3, name: "Explorer", icon: "🗺️", date: null, earned: false },
  { id: 4, name: "Volunteer", icon: "❤️", date: null, earned: false },
];

// --- SUB-COMPONENTS ---

const ViewToggle = ({ mode, setMode }) => (
  <div className="fixed top-20 right-4 z-[1000] bg-white/90 backdrop-blur rounded-full p-1 border border-neutral-200 shadow-lg flex">
    <button onClick={() => setMode('traveler')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'traveler' ? 'bg-teal-600 text-white shadow-md' : 'text-neutral-500'}`}>Traveler</button>
    <button onClick={() => setMode('business')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'business' ? 'bg-orange-500 text-white shadow-md' : 'text-neutral-500'}`}>Owner</button>
  </div>
);

const DetailView = ({ item, onBack }) => {
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    setBooked(true);
    const message = `Hi ${item.name}, I saw you on DiscoverJA! I would like to make a reservation.`;
    const url = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(message)}`;
    console.log("Opening WhatsApp:", url);
  };

  return (
    <div className="bg-white min-h-screen pb-24 animate-in slide-in-from-bottom-4 duration-300 relative z-[2000]">
      <div className="relative h-72 w-full">
        <img src={item.image} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors z-10">
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24 text-white">
          <h1 className="text-3xl font-bold mb-1">{item.name}</h1>
          <div className="flex items-center text-sm opacity-90">
             <MapPin size={14} className="mr-1" /> {item.location}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex items-start space-x-3">
          <ShieldCheck className="text-teal-600 shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-teal-900 text-sm">Verified Open</h3>
            <p className="text-teal-700 text-xs">Confirmed by Scout <strong>{item.scout_verified}</strong> 24 hours ago.</p>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-end mb-2">
             <h3 className="font-bold text-neutral-800">Community Impact Score</h3>
             <span className="text-teal-600 font-bold text-xl">{item.impact_score}/100</span>
           </div>
           <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden">
             <div className="bg-gradient-to-r from-teal-400 to-green-500 h-full rounded-full" style={{ width: `${item.impact_score}%` }}></div>
           </div>
           <p className="text-xs text-neutral-500 mt-2">High impact: This business directly funds local repairs.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">About</h3>
          <p className="text-neutral-600 leading-relaxed text-sm">{item.full_bio}</p>
        </div>

        <div className="flex flex-wrap gap-2">
           {item.amenities.map(tag => (
             <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold rounded-full">{tag}</span>
           ))}
        </div>

        <div className="pt-4">
           {booked ? (
             <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold flex flex-col items-center border border-green-200">
                <Check size={32} className="mb-2" />
                WhatsApp Opened!
                <span className="text-xs font-normal opacity-80 mt-1">Check your other tab to chat with the owner.</span>
             </div>
           ) : (
             <button 
               onClick={handleBooking}
               className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex justify-center items-center"
             >
               <Phone size={20} className="mr-2" />
               Book via WhatsApp
             </button>
           )}
           <p className="text-center text-xs text-neutral-400 mt-3">No booking fees. 100% goes to the owner.</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const App = () => {
  const [mode, setMode] = useState('traveler');
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedListing, setSelectedListing] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Business State
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const [specialOffer, setSpecialOffer] = useState("Free Rum Punch with Entry");
  const [showQR, setShowQR] = useState(false);

  // --- FILTER LOGIC ---
  const filteredListings = LISTINGS.filter(item => {
    // 1. Check Category
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    // 2. Check Search Text (Name or Location)
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // -- BUSINESS OWNER VIEW --
  if (mode === 'business') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
        <ViewToggle mode={mode} setMode={setMode} />
        
        {/* Header */}
        <header className="bg-white px-6 pt-6 pb-8 border-b border-slate-200 rounded-b-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Command Center</h1>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border-2 border-orange-50">JB</div>
          </div>

          {/* Live Status Toggle */}
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
          
          {/* Quick Actions Grid */}
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
              <button className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:shadow-md transition-all active:scale-95">
                <Edit3 className="text-blue-500" size={28} />
                <span className="text-sm font-bold">Edit Listing</span>
              </button>
            </div>
          </div>

          {/* Today's Special Editor */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-3">
               <h3 className="font-bold text-slate-800 flex items-center"><Bell size={16} className="mr-2 text-orange-500"/> Today's Flash Offer</h3>
               <span className="text-xs text-slate-400">Visible to 200+ users</span>
             </div>
             <textarea 
               value={specialOffer}
               onChange={(e) => setSpecialOffer(e.target.value)}
               className="w-full bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
               rows={2}
             />
             <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Update Offer</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-500 font-medium uppercase">Profile Views</span>
              <div className="text-2xl font-bold mt-1 text-slate-800">142</div>
              <div className="text-xs text-green-600 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +12%</div>
            </div>
            <div className="bg-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-500 font-medium uppercase">Est. Revenue</span>
              <div className="text-2xl font-bold mt-1 text-slate-800">$4,250</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Recovery Badge</h3>
               <p className="text-slate-300 text-sm mb-4">You are verified as a Founding Member.</p>
               <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold">View Certificate</button>
             </div>
             <Award className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
          </section>
        </main>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShowQR(false)}>
             <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center relative animate-in zoom-in-50 duration-200" onClick={e => e.stopPropagation()}>
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl border-4 border-white shadow-lg -mt-16">JB</div>
                <h3 className="text-2xl font-bold mb-1">Scan to Verify</h3>
                <p className="text-slate-500 text-sm mb-6">Show this to scouts or tourists.</p>
                
                <div className="bg-slate-900 p-6 rounded-2xl mb-6 inline-block shadow-xl">
                   <QrCode size={160} className="text-white" />
                </div>
                
                <button 
                  onClick={() => setShowQR(false)}
                  className="w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-xl"
                >
                  Close
                </button>
             </div>
          </div>
        )}
      </div>
    );
  }

  // -- TRAVELER VIEW --
  
  if (selectedListing) {
    return (
      <>
        <ViewToggle mode={mode} setMode={setMode} />
        <DetailView item={selectedListing} onBack={() => setSelectedListing(null)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 pb-24">
      <ViewToggle mode={mode} setMode={setMode} />
      
      {/* Top Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-[900] px-4 py-3 flex items-center justify-between border-b border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">J</div>
          <span className="font-bold text-lg tracking-tight">Discover<span className="text-teal-600">JA</span></span>
        </div>
        <div className="w-9 h-9 bg-neutral-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
           <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover"/>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        
        {/* --- DISCOVER TAB --- */}
        {activeTab === 'discover' && (
          <>
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
              
              {/* Category Filter */}
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
                      className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="h-48 bg-neutral-200 relative">
                        <img src={item.image} className="w-full h-full object-cover"/>
                        {item.impact_badge && (
                          <div className="absolute bottom-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">REBUILDING PARTNER</div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center shadow-sm">
                          <Star size={12} className="text-yellow-500 fill-current mr-1" /> {item.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-neutral-800 mb-1">{item.name}</h3>
                        <div className="flex items-center text-neutral-500 text-xs mb-3">
                           <MapPin size={12} className="mr-1" /> {item.location}
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                          <span className="text-sm font-bold text-neutral-900">{item.price}</span>
                          <span className="text-teal-600 text-sm font-bold flex items-center">View Details <ArrowLeft size={16} className="rotate-180 ml-1"/></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 opacity-60">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🧐</div>
                  <h3 className="font-bold text-lg">No places found</h3>
                  <p className="text-sm">Try searching for something else or clear your filters.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
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
             <MapContainer center={[18.1096, -77.2975]} zoom={9} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {LISTINGS.map(item => (
                   <Marker key={item.id} position={item.coordinates}>
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
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-lg z-[1000]">
                Showing {LISTINGS.length} Verified Locations
             </div>
          </div>
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
             <div className="flex items-center space-x-4 mb-8">
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
               <div className="space-y-3">
                 {LISTINGS.slice(0, 2).map(item => (
                   <div key={item.id} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-sm">
                      <div className="w-12 h-12 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                         <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-bold text-sm">{item.name}</h4>
                         <span className="text-xs text-neutral-500">{item.location}</span>
                      </div>
                      <button className="text-teal-600 font-bold text-xs" onClick={() => setSelectedListing(item)}>View</button>
                   </div>
                 ))}
               </div>
             </div>
             
             <button className="w-full py-4 text-neutral-400 text-sm font-bold flex items-center justify-center hover:text-red-500 transition-colors">
               <LogOut size={16} className="mr-2" /> Sign Out
             </button>
          </div>
        )}

      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-neutral-200 pb-6 pt-2 px-6 z-[1000]">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {['discover', 'map', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab ? 'text-teal-600' : 'text-neutral-400'}`}>
              <div className="w-6 h-6 flex items-center justify-center">
                 {tab === 'discover' && <Compass size={24} className={activeTab === tab ? 'fill-current' : ''} />}
                 {tab === 'map' && <MapPin size={24} className={activeTab === tab ? 'fill-current' : ''} />}
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
