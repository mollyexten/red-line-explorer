# Red Line Explorer

[Red Line Explorer](https://admiring-khorana-4fddb6.netlify.app/)

## Project Description

Red Line Explorer is a mobile-first application made from Airtable and React in which the user is able to find things to do near MBTA stations on the Red Line (Boston, MA). From the homepage, the user can select a station page to find the beloved places, activities, and itineraries of others users. If a user is familiar with a particular station, they can contribute their own suggestions via a form.

## Wireframes

The wireframes depict the layout in a mobile and desktop view. The homepage, entitled "RED LINE EXPLORER" links to specific station pages, referred to as "STATION" in this example. Each station page will render user contributions. Also included are the form ("Share Your Experience") and the About page.

![MobileWireframes](https://i.imgur.com/2aVTSrH.jpg)
![DesktopWireframes](https://i.imgur.com/hdtHEr9.jpg)

## Component Hierarchy
![ComponentHierarchy](https://i.imgur.com/LGhaPqg.jpg)

## API and Data Sample

There will be two tables: stations and recommendations.

Here is a data sample from the stations table. I will access this table via get requests on the home and form components. Note the two different ids: (1) randomly generated id and (2) a sort-id to be used when rendering the stations in order on the homepage.
```
{
    "id": "recTNQvkYjoI7GX3A",
    "fields": {
        "sort-id": 10,
        "station-kebab": "alewife",
        "Name": "Alewife"
    },
    "createdTime": "2021-03-15T15:16:49.000Z"
}
```

Here is a data sample from the recommendations table. I will access data from this table via get requests on the station component and pass it as props to the recommendation component. On the form component, I will post data to this table. The id-like value in the station section corresponds to the randomly generated id in the stations table.
```        
{
    "id": "recuElOvA7w4XZ23g",
    "fields": {
        "name": "Molly",
        "content": "On a nice, non-windy day, the nearby Esplanade is the most beautiful park in the city. Great place for runners. Have a picnic and watch the sailboats ...",
        "station": [
            "rec3vw7LEAKQ5TmLh"
        ]
    },
    "createdTime": "2021-03-15T15:42:22.000Z"
}
```

### MVP/PostMVP

#### MVP
- Set up an effective and understandable database on Airtable
- Create home, station, recommendation, form, about, and nav components
- Map out stations into CSS grid on homepage
- Utilize functional and (maybe) class components to link/route to appropriate pages
- Use axios to complete get requests from stations and recommendations tables
- Use axios to post requests from recommendations table on Airtable
- Make a mobile first design with a breakpoint for desktops
- No errors or logs to the console
- Add a dropdown for station IDs
- Redirect user to homepage after submitting form

#### PostMVP
- Make put request to fill in station data when user clicks on the share button from a specific station page
- Make a hamburger menu
- Add another MBTA line

## Project Schedule

| Day       | Deliverable                       | Status     |
| --------- | --------------------------------- | ---------- |
| Mar 15    | Proposal approval/Airtable setup  | Complete   |
| Mar 16    | Create components/get & post data | Complete   |
| Mar 17    | Get & post cont'd/Basic CSS       | Complete   |
| Mar 18    | Grid, flexbox, responsive CSS/MVP | Complete   |
| Mar 19    | Advanced styling/post MVP         | Complete   |
| Mar 20-21 | Post MVP                          | Complete   |
| Mar 22    | Presentations                     | Incomplete |

## Timeframes

| Component         | Estimated Time | Time Invested | Actual Time |
| ----------------- | -------------- | ------------- | ----------- |
| Proposal          | 2 hrs          | 4 hrs         | 4 hrs       |
| Proposal revision | 3 hrs          | 3 hrs         | 3 hrs       |
| Airtable          | 3 hrs          | 2 hrs         | 2 hrs       |
| Form component    | 2 hrs          | 3 hrs         | 3 hrs       |
| Rec. component    | 1 hrs          | .5 hr         | .5 hr       |
| Station component | 3 hrs          | 8 hrs         | 8 hrs       |
| Home component    | 3 hrs          | 2 hrs         | 2 hrs       |
| Nav component     | .5 hr          | .5 hr         | .5 hr       |
| About component   | .5 hr          | .5 hr         | .5 hr       |
| Commenting        | 3 hrs          | 1 hr          | 1 hr        |
| CSS color & font  | 2 hrs          | 3 hrs         | 3 hrs       |
| CSS icons/buttons | 1 hr           | 1 hr          | 1 hr        |
| Advanced CSS      | 2 hrs          | 4 hrs         | 4 hrs       |
| Flexbox/Grid-home | 3 hrs          | 4 hrs         | 4 hrs       |
| Flex/Grid-station | 3 hrs          | 0 hrs         | 0 hrs       |
| Flex/Grid-form    | 1 hr           | 2 hrs         | 2 hrs       |
| breakpoint-home   | 1 hr           | 3 hrs         | 3 hrs       |
| breakpoint-station| 1 hr           | 0 hrs         | 0 hrs       |
| breakpoint-form   | 1 hr           | 2 hrs         | 2 hrs       |
| Clean components  | 3 hrs          | 2 hrs         | 2 hrs       |
| Organize CSS      | 2 hrs          | 1 hr          | 1 hr        |
| Add form redirect | 1 hrs          | .5 hrs        | .5 hrs      |
| TOTAL             | 42 hrs         | 47 hrs        | 47 hrs      |


## SWOT Analysis

### Strengths:
I understand how the different parts of my app should connect to each other. I can refer to classwork and homework assignments for extra help along the way.

### Weaknesses:
In the station component, I think I need to use params to set the route path but need to double check this notion before proceeding.
In the form component, I don't know how to use the station dropdown menu to set the stations field in the recommendations table. It contains the unique ID from the stations table, but I think it will be something that I do in the handleSubmit function. Not sure about this, though. I also don't know how to post data selected from a dropdown menu. Very confused about this.
I am not experienced with usinhg two linked tables on Airtable.

### Opportunities:
Figuring out params on this problem will probably help clear up my confusion. It will also help cement the concepts I've learned from this unit.

### Threats:
My biggest threat is getting stuck on one small part. If I've run out of ideas for debugging, I need to find other points to work on while I wait for help. 
