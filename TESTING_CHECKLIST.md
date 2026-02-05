# Life Logger - Testing Checklist

## ✅ Pre-Launch Verification

### **Backend Setup**
- [ ] MongoDB is running on localhost:27017
- [ ] Backend server starts without errors
- [ ] JWT secret is configured
- [ ] File upload directory is created
- [ ] All API endpoints are accessible

### **Frontend Setup**
- [ ] Frontend dev server starts without errors
- [ ] No console errors on page load
- [ ] All routes are accessible
- [ ] API base URL is correctly configured

---

## 🧪 Feature Testing

### **Authentication**
- [ ] Register new user works
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Logout works and redirects to login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Token persists across page refreshes

### **Dashboard**
- [ ] Displays correct statistics (counts)
- [ ] Shows recent journal entries
- [ ] All navigation cards are clickable
- [ ] "New Entry" button works
- [ ] Loading state appears briefly

### **Journals**
**Create:**
- [ ] "New Entry" button opens form page
- [ ] All mood options are available
- [ ] Content textarea accepts input
- [ ] Context field works
- [ ] Tags field accepts comma-separated values
- [ ] Form validation works (required fields)
- [ ] Save button creates new journal
- [ ] Redirects to journals list after save
- [ ] New entry appears in the list

**Read:**
- [ ] All journals are displayed
- [ ] Journals are sorted by date (newest first)
- [ ] Mood badges display correctly
- [ ] Tags are shown
- [ ] Context is displayed
- [ ] Date formatting is correct

**Update:**
- [ ] Edit button opens form with existing data
- [ ] All fields are pre-populated
- [ ] Changes are saved correctly
- [ ] Updated entry reflects changes

**Delete:**
- [ ] Delete button shows confirmation dialog
- [ ] Confirming deletes the journal
- [ ] Canceling keeps the journal
- [ ] Deleted journal disappears from list

**Search & Filter:**
- [ ] Search by content works
- [ ] Filter by mood works
- [ ] Filter by context works
- [ ] Multiple filters work together
- [ ] Clear filters resets the list

### **Memories**
**Create:**
- [ ] Form is visible on the page
- [ ] Textarea accepts input (max 200 chars)
- [ ] Character counter updates
- [ ] Mood selection works
- [ ] Tags field works
- [ ] Submit creates new memory
- [ ] Form resets after submission
- [ ] New memory appears in list

**Read:**
- [ ] All memories are displayed
- [ ] Timestamp is formatted correctly
- [ ] Mood badge displays
- [ ] Tags are shown

**Delete:**
- [ ] Delete button shows confirmation
- [ ] Confirming deletes the memory
- [ ] Memory disappears from list

**Search & Filter:**
- [ ] Search by text works
- [ ] Filter by mood works

### **Tastes**
**Create:**
- [ ] "Add New" button toggles form
- [ ] All type options are available (7 types)
- [ ] Title field works
- [ ] Rating selection works (1-5 stars)
- [ ] Date consumed field works
- [ ] Mood selection works
- [ ] Personal note textarea works
- [ ] Tags field works
- [ ] Save creates new taste
- [ ] Form closes after save
- [ ] New taste appears in grid

**Read:**
- [ ] All tastes are displayed in grid
- [ ] Type icons display correctly
- [ ] Star ratings display correctly
- [ ] Mood badges show
- [ ] Tags are visible
- [ ] Cards have hover effect

**Update:**
- [ ] Edit button opens form with data
- [ ] All fields are pre-populated
- [ ] Changes save correctly
- [ ] Updated taste reflects changes

**Delete:**
- [ ] Delete shows confirmation
- [ ] Confirming deletes the taste
- [ ] Taste disappears from grid

**Search & Filter:**
- [ ] Search by title works
- [ ] Search by note works
- [ ] Filter by type works
- [ ] Filter by rating works
- [ ] Tastes are sorted by rating

### **Places**
**Create:**
- [ ] "Add Place" button toggles form
- [ ] All type options available (9 types)
- [ ] Name field works
- [ ] Status selection works (3 options)
- [ ] Latitude field accepts numbers
- [ ] Longitude field accepts numbers
- [ ] Date visited field works
- [ ] Mood selection works
- [ ] Experience note textarea works
- [ ] Tags field works
- [ ] Save creates new place
- [ ] Form closes after save
- [ ] New place appears in grid

**Read:**
- [ ] All places are displayed
- [ ] Type icons display correctly
- [ ] Status badges show with correct colors
- [ ] Coordinates are displayed
- [ ] Mood badges show
- [ ] Tags are visible
- [ ] Cards have hover effect

**Update:**
- [ ] Edit button opens form with data
- [ ] All fields are pre-populated
- [ ] Changes save correctly
- [ ] Updated place reflects changes

**Delete:**
- [ ] Delete shows confirmation
- [ ] Confirming deletes the place
- [ ] Place disappears from grid

**Map Integration:**
- [ ] "View Map" button works
- [ ] Opens Google Maps in new tab
- [ ] Correct coordinates are passed

**Search & Filter:**
- [ ] Search by name works
- [ ] Search by note works
- [ ] Filter by type works
- [ ] Filter by status works

### **Photos**
**Upload:**
- [ ] "Upload Photo" button toggles form
- [ ] File input accepts images only
- [ ] File size validation works (10MB max)
- [ ] Selected filename is displayed
- [ ] Location field works
- [ ] Mood selection works
- [ ] Story textarea works
- [ ] Technical notes textarea works
- [ ] Tags field works
- [ ] Upload button submits form
- [ ] Photo appears in gallery
- [ ] Form closes after upload

**Read:**
- [ ] All photos are displayed in grid
- [ ] Photos load correctly
- [ ] Mood overlay shows on thumbnails
- [ ] Location is displayed
- [ ] Tag preview shows (max 3 tags)
- [ ] Grid is responsive

**Modal View:**
- [ ] Clicking photo opens modal
- [ ] Full-size image displays
- [ ] All metadata is shown (location, mood, story, technical notes, tags)
- [ ] Date is formatted correctly
- [ ] Close button works
- [ ] Clicking outside modal closes it

**Delete:**
- [ ] Delete button in modal works
- [ ] Confirmation dialog appears
- [ ] Confirming deletes photo
- [ ] Photo disappears from gallery
- [ ] Modal closes after deletion

**Search & Filter:**
- [ ] Search by location works
- [ ] Search by story works
- [ ] Search by technical notes works
- [ ] Filter by mood works

---

## 🎨 UI/UX Testing

### **General**
- [ ] All pages have consistent styling
- [ ] Loading states appear when fetching data
- [ ] Error messages display when operations fail
- [ ] Success feedback is clear
- [ ] Empty states show helpful messages
- [ ] All buttons have hover effects
- [ ] All cards have hover effects
- [ ] Animations are smooth (not janky)

### **Navbar**
- [ ] Logo/brand is visible
- [ ] All navigation links work
- [ ] Active page is highlighted
- [ ] Username is displayed
- [ ] Logout button works
- [ ] Navbar is sticky on scroll
- [ ] Responsive on mobile

### **Forms**
- [ ] All inputs have proper labels
- [ ] Focus states are visible
- [ ] Validation messages appear
- [ ] Required fields are marked
- [ ] Cancel buttons work
- [ ] Submit buttons show loading state
- [ ] Forms have slide animations

### **Responsive Design**
- [ ] Desktop view (1200px+) looks good
- [ ] Tablet view (768-1200px) looks good
- [ ] Mobile view (<768px) looks good
- [ ] Grids adjust properly
- [ ] Navigation adapts on mobile
- [ ] Forms are usable on mobile
- [ ] Buttons are touch-friendly

### **Accessibility**
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Color contrast is sufficient
- [ ] Text is readable

---

## 🔧 Technical Verification

### **API Calls**
- [ ] All GET requests work
- [ ] All POST requests work
- [ ] All PUT requests work
- [ ] All DELETE requests work
- [ ] Authentication headers are sent
- [ ] Error responses are handled
- [ ] Loading states work

### **Data Persistence**
- [ ] Created items persist after page refresh
- [ ] Updated items show changes after refresh
- [ ] Deleted items don't reappear
- [ ] User session persists

### **File Upload**
- [ ] Photos are saved to server
- [ ] Photo URLs are correct
- [ ] Photos are accessible via URL
- [ ] Deleted photos are removed from server

### **Performance**
- [ ] Pages load quickly
- [ ] No memory leaks
- [ ] Images are optimized
- [ ] API calls are efficient
- [ ] No unnecessary re-renders

---

## 🐛 Common Issues to Check

### **Backend**
- [ ] MongoDB connection errors
- [ ] JWT token expiration
- [ ] File upload directory permissions
- [ ] CORS configuration
- [ ] Port conflicts

### **Frontend**
- [ ] API base URL configuration
- [ ] Token storage in localStorage
- [ ] Image paths for uploaded photos
- [ ] Form validation edge cases
- [ ] Browser console errors

---

## 📊 Test Data Suggestions

### **Journals**
- Create entries with different moods
- Use various contexts (work, personal, family)
- Add multiple tags
- Test with very long content
- Test with minimal content

### **Memories**
- Test character limit (200 chars)
- Use different moods
- Add various tags

### **Tastes**
- Add items of each type
- Use all rating levels (1-5 stars)
- Test with and without dates
- Add detailed notes

### **Places**
- Add places of each type
- Use all status options
- Test with real coordinates
- Add experience notes

### **Photos**
- Upload different image formats (jpg, png, etc.)
- Test file size limits
- Add complete metadata
- Test without optional fields

---

## ✅ Final Checklist

- [ ] All features work as expected
- [ ] No console errors
- [ ] No broken links
- [ ] All images load
- [ ] All forms validate properly
- [ ] All CRUD operations work
- [ ] Search and filter work on all pages
- [ ] Responsive design works
- [ ] Authentication flow is secure
- [ ] User experience is smooth

---

## 🎉 Ready for Production!

Once all items are checked, the Life Logger application is ready for daily use!

**Last Updated:** February 2026
