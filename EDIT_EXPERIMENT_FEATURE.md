# Experiment Edit Feature Documentation

## Overview
Added the ability to edit experiment names (titles), aims, and objectives directly from the experiment details page.

## Changes Made

### 1. **ExperimentDetails.jsx** (`src/pages/ExperimentDetails.jsx`)
   - Added state management for editing mode with `isEditingTitle` state
   - Added editable fields for:
     - **Experiment Title**: Main experiment name
     - **Aim**: Experiment aim description
     - **Objective**: Experiment objective description
   - Added edit button (pencil icon) next to the title
   - Save and Cancel buttons appear when in edit mode
   - Event dispatcher to notify the app when experiments are updated

### 2. **Styling** (`src/index.css`)
   - Added `.edit-title-container` - Container for editable title
   - Added `.title-display` - Display mode styling with flexbox
   - Added `.edit-button-icon` - Styled edit button with hover effects
   - Added `.edit-form` - Edit form container
   - Added `.edit-input` - Input field styling
   - Added `.title-input` - Larger font size for title inputs
   - Added `.textarea-input` - Textarea styling with resize capability
   - Added `.detail-header` - Header with edit buttons
   - Added `.heading-actions` - Action buttons container
   - Added `.edit-actions` - Save/Cancel button styling
   - Responsive design for mobile with stacked buttons

## Features

### Edit Button
- Click the pencil icon (✎) next to the experiment title to enter edit mode
- The button is styled with a primary soft background color
- Hover effect shows the button highlight

### Edit Mode
When in edit mode:
- Title becomes an editable input field
- Aim and Objective fields become editable textareas
- Save and Cancel buttons appear in the top-right
- Back to Experiments button is hidden
- Edit buttons appear next to Aim and Objective headings

### Save Changes
- Click the "Save" button to save your changes
- Changes are reflected immediately on the page
- An `experiment-updated` event is dispatched for other components to listen

### Cancel Editing
- Click the "Cancel" button to discard changes
- Original values are restored
- Edit mode is closed

## Icon Usage
The feature uses icons from `lucide-react`:
- `Edit2` - Edit/pencil icon
- `Save` - Save/floppy disk icon
- `X` - Close/cancel icon
- `ArrowLeft` - Back arrow (existing)

## Responsive Design
- On mobile devices (max-width: 700px):
  - Edit buttons stack vertically
  - Full width buttons for better touch targets
  - Maintains usability on smaller screens

## Technical Details

### State Management
```jsx
const [isEditingTitle, setIsEditingTitle] = useState(false);
const [editedTitle, setEditedTitle] = useState('');
const [editedObjective, setEditedObjective] = useState('');
const [editedAim, setEditedAim] = useState('');
```

### Event Handling
- `handleSaveChanges()` - Saves the updated experiment data
- `handleCancel()` - Reverts to original values and closes edit mode
- Custom event dispatched: `experiment-updated`

## Future Enhancements
- Persist changes to a backend database
- Add validation for required fields
- Add more editable fields (Theory, Procedure, etc.)
- Add edit confirmation dialogs
- Add version history/undo functionality
