# Red Line Explorer

deployed site here

## Project Description

Red Line Explorer is a mobile-first application made from Airtable and React in which the user is able to find things to do near MBTA stations on the Red Line (Boston, MA). From the homepage, the user can select a station page to find the beloved places, activities, and itineraries of others users. If a user is familiar with a particular station, they can contribute their own suggestions via a form.

## Wireframes

The wireframes depict the layout in a mobile view. The homepage, entitled "RED LINE EXPLORER" links to specific station pages, referred to as "STATION" in this example. Each station page will render user contributions. Also included are the form ("Share Your Experience") and the About page.

![Wireframes](https://i.imgur.com/NMWg5lG.jpg)

## Component Hierarchy
![ComponentHierarchy](https://i.imgur.com/ja3lvlg.jpeg)

## API and Data Sample

```        
{
  {            
    "id": "recgGlIpJnta3CcmC","fields": {
                "station-kebab": "charles-mgh",
                "station": "Charles/MGH",
                "name": "Molly",
                "date": "2021-03-13",
                "content": "On any non-windy day, the Esplanade is an amazing park to visit. Watch sailboats on the Charles and have a picnic. Great spot for runners. You can als..."
            },
            "createdTime": "2021-03-13T01:40:29.000Z"
        },
    "offset": "recgGlIpJnta3CcmC"
}
```

### MVP/PostMVP

#### MVP
- Set up an effective and understandable database on Airtable
- Create home, station, recommendation, form, about, and nav components
- Utilize functional and (maybe) class components to link/route to appropriate pages
- Use axios to complete get and post requests with Airtable database
- Implement styling, including flexbox and/or grid
- Make a mobile first design with a breakpoint for desktops
- No errors or logs to the console

#### PostMVP
- Redirect user to station after submitting form
- Make put request to fill in station data when user clicks on the share button from a specific station page
- Make a hamburger menu
- Add another MBTA line

## Project Schedule

| Day       | Deliverable                       | Status     |
| --------- | --------------------------------- | ---------- |
| Mar 15    | Proposal approval/Airtable setup  | Incomplete |
| Mar 16    | Create components/get & post data | Incomplete |
| Mar 17    | Get & post cont'd/Basic CSS       | Incomplete |
| Mar 18    | Grid, flexbox, responsive CSS/MVP | Incomplete |
| Mar 19    | Advanced styling/post MVP         | Incomplete |
| Mar 20-21 | Post MVP                          | Incomplete |
| Mar 22    | Presentations                     | Incomplete |

## Timeframes

| Component         | Estimated Time | Time Invested | Actual Time |
| ----------------- | -------------- | ------------- | ----------- |
| Proposal          | 2 hrs          |               |             |
| Airtable          | 3 hrs          |               |             |
| Form component    | 2 hrs          |               |             |
| Rec. component    | 1 hrs          |               |             |
| Station component | 3 hrs          |               |             |
| Home component    | 3 hrs          |               |             |
| Nav component     | .5 hr          |               |             |
| About component   | .5 hr          |               |             |
| Fix props/ toggle | 3 hrs          |               |             |
| CSS color & font  | 2 hrs          |               |             |
| CSS icons         | 1 hr           |               |             |
| Advanced CSS       | 2 hrs          |               |             |
| Flexbox/Grid-home | 1.5 hrs        |               |             |
| Flex/Grid-station | 1.5 hrs        |               |             |
| Flex/Grid-form    | 1 hr           |               |             |
| breakpoint-home   | 1 hr           |               |             |
| breakpoint-station| 1 hr           |               |             |
| breakpoint-form   | 1 hr           |               |             |
| Clean components  | 3 hrs          |               |             |
| Organize CSS      | 2 hrs          |               |             |
| Add form redirect | 1 hrs          |               |             |
| Put-form          | 3 hrs          |               |             |
| TOTAL             | 40 hrs         |               |             |


## SWOT Analysis

### Strengths:
I understand how the different parts of my app should connect to each other. I can refer to classwork and homework assignments for extra help along the way.

### Weaknesses:
I'm unsure how to link stations up with params. This has been a difficult for me in this unit. Getting from App through Home to each Station will be one of my first challenges in this assignment. I want the stations to render on the homepage in their respective branches, and I was planning to do this by making three separate <ul> tags because then the CSS would be easier, but I don't know how this would look in react. Maybe I need a separate branch component?

### Opportunities:
Figuring out params on this problem will probably help clear up my confusion. It will also help cement the concepts I've learned from this unit.

### Threats:
My biggest threat is getting stuck on one small part. If I've run out of ideas for debugging, I need to find other points to work on while I wait for help. 
