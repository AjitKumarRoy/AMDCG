const fs = require('fs');
const path = require('path');

// Define paths
const dataDir = path.join(process.cwd(), 'src', 'data');
const outputFile = path.join(process.cwd(), 'public', 'searchIndex.json');

// --- Helper Function to Read JSON Files ---
function readJsonFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        // We'll return null and let the main function handle the error message.
        return null;
    }
}

// --- Main Function to Generate the Index ---
function generateSearchIndex() {
    console.log('🚀 Starting detailed search index generation...');
    const searchIndex = [];

    // --- Process each data file and extract detailed content ---

    // 1. Homepage Content (Themes, FAQ, etc.)
    const homeData = readJsonFile(path.join(dataDir, 'homePage/hero.json'));
    if (homeData) {
        searchIndex.push({ title: "Home", url: "/", description: homeData.conferenceTitle });
        homeData.infoSections?.forEach(section => {
            searchIndex.push({ title: section.title, url: "/#hero", description: section.content });
        });
    }

    const organizingInstitutes = readJsonFile(path.join(dataDir, 'homePage/organizers.json'));
    if (organizingInstitutes) {
        organizingInstitutes.forEach(organizer => {
            searchIndex.push({ title: `Organizer: ${organizer.title}`, url: "/#organizers", description: organizer.description });
        });
    }


    const speakers = readJsonFile(path.join(dataDir, 'homePage/speakers.json'));
    if (speakers) {
        speakers.forEach(speaker => {
            searchIndex.push({ title: `Speaker: ${speaker.name}`, url: "/#speakers", description: speaker.affiliation });
        });
    }


    const importantDates = readJsonFile(path.join(dataDir, 'homePage/importantDates.json'));
    if (importantDates) {
        importantDates.forEach(date => {
            searchIndex.push({ title: `Date: ${date.event}`, url: "/#dates", description: date.date });
        });
    }


    const venueData = readJsonFile(path.join(dataDir, 'homePage/venue.json'));
    if (venueData) {
        searchIndex.push({
            title: `Venue: ${venueData.name}`,
            url: "/#venue", 
            description: venueData.description
        });
    }

    const attractionPlaces = readJsonFile(path.join(dataDir, 'homePage/attractions.json'));
    if (attractionPlaces) {
        attractionPlaces.forEach(place => {
            searchIndex.push({ title: `Place: ${place.title}`, url: "/#attraction", description: "Nearby places to visit." });
        });
    }

    const faqData = readJsonFile(path.join(dataDir, 'homePage/faq.json'));
    if (faqData) {
        faqData.forEach(faq => {
            searchIndex.push({ title: `FAQ: ${faq.question}`, url: "/#faq", description: faq.answer });
        });
    }

    // 2. About Page
    const aboutData = readJsonFile(path.join(dataDir, 'aboutPage/aboutPage.json'));
    if (aboutData) {
        searchIndex.push({ title: "About Smart'25", url: "/about", description: aboutData.hero.subtitle });
        aboutData.themes?.forEach(theme => {
            searchIndex.push({ title: `Theme: ${theme.title}`, url: "/about", description: theme.description });
        });
    }

    // 3. Speakers Page
    const speakersData = readJsonFile(path.join(dataDir, 'speakersPage.json'));
    if (speakersData) {
        searchIndex.push({ title: "Speakers", url: "/speakers", description: speakersData.hero.subtitle });
        speakersData.keynoteSpeakers?.forEach(speaker => {
            searchIndex.push({ title: `Speaker: ${speaker.name}`, url: "/speakers", description: `Keynote Speaker - ${speaker.affiliation}` });
        });
        speakersData.invitedSpeakers?.forEach(speaker => {
            searchIndex.push({ title: `Speaker: ${speaker.name}`, url: "/speakers", description: `Invited Speaker - ${speaker.affiliation}` });
        });
    }

    // 4. Committee Page (Corrected Path)
    const committeeData = readJsonFile(path.join(dataDir, 'committeePage/committePage.json'));
    if (committeeData) {
    searchIndex.push({ title: "Committee", url: "/committee", description: committeeData.hero.subtitle });
    
    // Read Chief Patrons (using the title from the JSON)
    committeeData.chiefPatrons?.members.forEach(member => {
        searchIndex.push({ 
            title: `Committee: ${member.name}`, 
            url: "/committee#chiefPatron", 
            description: `${committeeData.chiefPatrons.title} - ${member.affiliation}` 
        });
    });
    
    // Read General Chairs (using the title from the JSON)
    committeeData.generalChairs?.members.forEach(member => {
        searchIndex.push({ 
            title: `Committee: ${member.name}`, 
            url: "/committee#generalChar", 
            description: `${committeeData.generalChairs.title} - ${member.affiliation}` 
        });
    });

    // --- NEW: Added logic for the Organizers section ---
    committeeData.organizers?.members.forEach(member => {
        searchIndex.push({
            title: `Committee: ${member.name}`,
            url: "/committee#organizer",
            description: `${committeeData.organizers.title} - ${member.affiliation}`
        });
    });
    
    // Read Technical Committee (using the title from the JSON)
    committeeData.technicalCommittee?.members.forEach(member => {
        searchIndex.push({ 
            title: `Committee: ${member.name}`, 
            url: "/committee#technical", 
            description: `${committeeData.technicalCommittee.title} - ${member.affiliation}` 
        });
    });
}
    
    // 5. Call for Papers Page
    const cfpData = readJsonFile(path.join(dataDir, 'callForPapersPage/callForPapers.json'));
    if (cfpData) {
        searchIndex.push({ title: "Call for Papers", url: "/call-for-papers", description: cfpData.hero.subtitle });
        cfpData.thematicAreas?.forEach(area => {
            searchIndex.push({
                title: `Theme: ${area.theme}`,
                url: '/call-for-papers#topics',
                description: `Topics include: ${area.topics.slice(0, 3).join(', ')}...`
            });
        });
    }


    // 6. Index Registration Details
    const registrationData = readJsonFile(path.join(dataDir, 'registrationPage/registrationPage.json'));
    if (registrationData) {
    // Add the main page entry
    searchIndex.push({ 
        title: "Registration", 
        url: "/registration", 
        description: registrationData.hero.subtitle 
    });

    // Add an entry for each fee category
    registrationData.fees?.forEach(fee => {
        searchIndex.push({
            title: `Fee: ${fee.category}`,
            url: '/registration',
            description: `Indian Participants (Online): INR ${fee.indian.online}, Other Participants (Online): USD ${fee.other.online}`
        });
    });

    // Add an entry for each included item
    registrationData.included?.forEach(item => {
        searchIndex.push({
            title: `Included: ${item}`,
            url: '/registration',
            description: "This item is included with your conference registration."
        });
    });

    // Add an entry for the cancellation policy
    searchIndex.push({
        title: "Cancellation Policy",
        url: '/registration',
        description: registrationData.cancellationPolicy
    });
}
    
    // ... You can add similar logic for other pages like Registration, Venue, etc.

    // Write the final index to the public folder
    try {
        fs.writeFileSync(outputFile, JSON.stringify(searchIndex, null, 2));
        console.log(`✅ Detailed search index with ${searchIndex.length} entries generated successfully!`);
    } catch (error) {
        console.error('❌ Error writing search index file:', error);
    }
}

// Run the function
generateSearchIndex();