import React, { useState } from 'react';
import { 
  MapPin, Camera, Calendar, User, Search, Menu, X, Star, Heart, 
  Share2, Compass, TrendingUp, Image as ImageIcon, Check, Smartphone, Award
} from 'lucide-react';

/**
 * DATA MOCKUP
 */
const CATEGORIES = [
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
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    description: "Zipline through the canopy and bobsled down the mountain.",
    impact_badge: true
  },
  {
    id: 2,
    name: "Scotchies Jerk Center",
    category: 'food',
    rating: 4.9,
    reviews: 3500,
    price: '$',
    image: "https://images.unsplash.com/photo-1596450518334-111b7b4a899c?auto=format&fit=crop&q=80&w=800",
    description: "The authentic jerk experience. Wood fire smoked chicken and pork.",
    impact_badge: false
  },
  {
    id: 3,
    name: "Bob Marley Museum",
    category: 'culture',
    rating: 4.7,
    reviews: 2100,
    price: '$$$',
    image: "https://images.unsplash.com/photo-1550418290-b8d86e8a8b1c?auto=format&fit=crop&q=80&w=800",
    description: "The former home and studio of the reggae legend.",
    impact_badge: true
  }
];

const ITINERARIES = [
  {
    id: 1,
    title: "Eco-Warrior Weekend",
    duration: "3 Days",
    cost: "$300",
    items: ["Blue Mountain Hike", "Coffee Farm Tour", "Rafting on Rio Grande"]
  },
  {
    id: 2,
    title: "Chill & Grill",
    duration: "5 Days",
    cost: "$650",
    items: ["Negril 7 Mile Beach", "Rick's Cafe Sunset", "Catamaran Cruise"]
  }
];

// --- COMPONENTS ---

const ViewToggle = ({ mode, setMode }) => (
  <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur rounded-full p-1 border border-neutral-200 shadow-lg flex">
    <button 
      onClick={() => setMode('traveler')}
      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'traveler' ? 'bg-teal-600 text-white shadow-md' : 'text-neutral-500'}`}
    >
      Traveler
    </button>
    <button 
      onClick={() => setMode('business')}
      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === 'business' ? 'bg-orange-500 text-white shadow-md' : 'text-neutral-500'}`}
    >
      Owner
    </button>
  </div>
);

// --- MAIN COMPONENT ---

const App = () => {
  const [mode, setMode] = useState('traveler');
  const [activeTab, setActiveTab] = useState('discover');
  const [showAR, setShowAR] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // -- BUSINESS DASHBOARD VIEW --
  if (mode === 'business') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <ViewToggle mode={mode} setMode={setMode} />
        
        <header className="bg-white px-6 py-6 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-800">My Business</h1>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">JB</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
              <span className="text-xs text-teal-600 font-medium uppercase">Bookings</span>
              <div className="text-2xl font-bold mt-1">142</div>
              <div className="text-xs text-teal-600 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +12%</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="text-xs text-orange-600 font-medium uppercase">Revenue</span>
              <div className="text-2xl font-bold mt-1">$4,250</div>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <section>
            <h3 className="font-bold text-slate-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: "Calendar" },
                { icon: ImageIcon, label: "Photos" },
                { icon: Share2, label: "Marketing" },
                { icon: Smartphone, label: "Preview" }
              ].map((action, i) => (
                <button key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-orange-500 transition-colors">
                  <action.icon className="text-orange-500" />
                  <span className="text-xs font-bold">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Recovery Status</h3>
               <p className="text-slate-300 text-sm mb-4">Update your status to attract "Impact Travelers".</p>
               <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                 <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                 <span className="text-sm font-medium">Fully Operational</span>
                 <button className="ml-auto text-xs bg-white text-slate-900 px-3 py-1 rounded-full font-bold">Edit</button>
               </div>
             </div>
             <Award className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
          </section>
        </main>
      </div>
    );
  }

  // -- TRAVELER VIEW --
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 pb-24">
      <ViewToggle mode={mode} setMode={setMode} />
      
      {/* Top Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-4 py-3 flex items-center justify-between border-b border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">J</div>
          <span className="font-bold text-lg tracking-tight">Discover<span className="text-teal-600">JA</span></span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAR(!showAR)} className={`p-2 rounded-full transition-colors ${showAR ? 'bg-teal-100 text-teal-700' : 'bg-neutral-100 text-neutral-600'}`}>
            <Camera size={20} />
          </button>
          <div className="w-9 h-9 bg-neutral-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover"/>
          </div>
        </div>
      </header>

      {/* AR OVERLAY (Simulated) */}
      {showAR && (
        <div className="fixed inset-0 top-16 z-30 bg-black/90">
          <div className="relative w-full h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1550418290-b8d86e8a8b1c?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute top-1/4 left-1/4 animate-bounce bg-white px-4 py-2 rounded-xl shadow-xl transform -translate-x-1/2">
              <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">Historical Site</div>
              <div className="font-bold text-sm">Devon House</div>
              <div className="text-xs text-neutral-500">0.4 km away</div>
            </div>
            <div className="absolute bottom-32 w-full text-center">
              <p className="text-white text-sm font-medium bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-md">Point camera at landmarks</p>
            </div>
          </div>
        </div>
      )}

      <main className="px-4 py-6 space-y-8">
        {!showAR && activeTab === 'discover' && (
          <>
            <section className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight text-neutral-800">Wah Gwaan, <br/><span className="text-teal-600">Ready to explore?</span></h1>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-neutral-400" size={20} />
                <input type="text" placeholder="Try 'Waterfalls near Ocho Rios'..." className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl shadow-sm border border-neutral-200 focus:outline-none focus:border-teal-500" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm whitespace-nowrap active:scale-95 transition-transform">
                    <span>{cat.icon}</span><span className="font-bold text-sm text-neutral-700">{cat.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-neutral-800">Support Recovery ❤️</h2>
                <button className="text-teal-600 text-sm font-bold">See all</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {LISTINGS.map(item => (
                  <div key={item.id} className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden group">
                    <div className="h-40 bg-neutral-200 relative">
                      <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"/>
                      {item.impact_badge && (
                        <div className="absolute bottom-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">REBUILDING PARTNER</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-neutral-800 truncate pr-2">{item.name}</h3>
                        <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 font-bold text-xs"><Star size={10} className="fill-current mr-1"/>{item.rating}</div>
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-bold text-neutral-900">{item.price} <span className="text-neutral-400 font-normal">• {item.category}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'itinerary' && (
           <div className="space-y-6">
              <h2 className="text-2xl font-bold">Personal Itinerary</h2>
              {!generatedItinerary ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                  <h3 className="font-bold text-lg mb-4">Let's plan your trip ✈️</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Vibe</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-3 rounded-xl border border-neutral-200 text-sm font-bold hover:bg-teal-50 transition-colors">Chill</button>
                        <button className="px-4 py-3 rounded-xl border border-neutral-200 text-sm font-bold hover:bg-teal-50 transition-colors">Adventure</button>
                      </div>
                    </div>
                    <button onClick={() => setGeneratedItinerary(ITINERARIES[0])} className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-600/20 active:scale-95 transition-transform">Generate Plan</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <h3 className="font-bold text-lg">Recommended for you</h3>
                     <button onClick={() => setGeneratedItinerary(null)} className="text-teal-600 text-xs font-bold">Reset</button>
                  </div>
                  {ITINERARIES.map(itin => (
                    <div key={itin.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
                       <div className="flex justify-between items-start mb-4">
                          <div><h4 className="font-bold text-lg">{itin.title}</h4><span className="text-xs text-neutral-500 font-medium">{itin.duration} • {itin.cost}</span></div>
                          <div className="bg-teal-100 text-teal-700 p-2 rounded-lg"><Compass size={20} /></div>
                       </div>
                       <div className="space-y-3">
                         {itin.items.map((stop, i) => (
                           <div key={i} className="flex items-center gap-3">
                             <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                             <span className="text-sm font-medium text-neutral-700">{stop}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-neutral-200 pb-6 pt-2 px-6 z-40">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {['discover', 'map', 'itinerary', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab ? 'text-teal-600' : 'text-neutral-400'}`}>
              <div className="w-6 h-6 bg-neutral-100 rounded-full" />
              <span className="text-[10px] font-bold capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
