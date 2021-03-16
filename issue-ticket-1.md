# PROJECT ISSUE TICKET

## Unexpected Behavior

> I cannot get the results from the recommendations table to filter by station id.

## Expected Behavior

> I expected that using the .filter function within the parentheses of setResults would provide the results state with the values it needed. 

## Reproduce the Error

> Describe the steps we can take to reproduce the error, i.e.:

```md
1. Make an Airtable database 
2. Make an axios get request
3. Store values from get request in the variable recs
4. setResults(recs.filter(red (rec.fields.station[0] === stationId)))
5. console.log(results)
6. Discover that an empty array logs to the console
```

## Documentation

> There is no error message

## Attempted Resolution

> I looked at these two websites

```md
1. https://stackoverflow.com/questions/50142525/how-to-render-the-elements-before-to-filter-elements-with-reactjs
2. https://stackoverflow.com/questions/55390113/pushing-responses-of-axios-request-into-array
```