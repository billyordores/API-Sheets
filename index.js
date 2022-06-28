const express = require("express");

const {google} = require("googleapis")

const app = express();

app.get("/", async (req, res) =>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",

    });

    //client instance
    const client = await auth.getClient();

    //intance googel sheets
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "15jjsfge0Or1hYrbk7d7NwXv-X7R9I5PIMFyH0EeWnb4";
    //get metadata
    const metaData =  await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })
    //read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        //
        // range: "hoja1", it is for calling rows
        //this is for calling columns
        range: "hoja1!A:A"

    })
    //write rows(s) to spreadsheets
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "hoja1!A1:B1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values:[
                ["escribiendo", "testwrite"],
                ["escribiendo2", "testwrite2"],
                ["escribiendo3", "testwrite3"],
            ]
        }
    })



    res.send(getRows.data);
})
app.listen(1337, (req, res) => console.log("runing on 1337"));