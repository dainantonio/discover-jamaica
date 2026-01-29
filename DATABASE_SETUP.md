Phase 2: Database Setup (Firebase) 🔥To turn DiscoverJA from a static prototype into a dynamic app, we use Google Firebase. It provides the Database, Image Storage, and Authentication for free (generous tier).🟢 Part 1: Create the ProjectGo to console.firebase.google.com.Click "Add project".Name it: Discover Jamaica.Disable Google Analytics for now (keeps it simple).Click Create Project.🟢 Part 2: Register the AppIn the project dashboard, click the Web icon (</>).Nickname: DiscoverJA-Web.Click Register app.COPY the firebaseConfig object (the code with apiKey, authDomain, etc.).Save this somewhere safe (like a Notepad file) for now.🟢 Part 3: Create the DatabaseOn the left menu, click Build -> Firestore Database.Click Create Database.Choose Location: nam5 (us-central) (Closest to Jamaica/Caribbean).Security Rules: Start in Test Mode (Allow read/write for 30 days).Click Enable.🟢 Part 4: Connecting Code (When you have terminal access)Create a file in your root folder called .env.local.Paste your keys there like this:VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
VITE_FIREBASE_PROJECT_ID=your_id_here
...
Install the library:npm install firebase
🟢 Part 5: Data Structure PlanWe will create a collection called businesses.Each document will look like this:{
  "name": "Auntie May's",
  "status": "OPEN",
  "parish": "Portland",
  "coordinates": { "lat": 18.1, "lng": -76.4 },
  "tags": ["food", "verified"],
  "verifiedBy": "Scout_ID_123"
}
