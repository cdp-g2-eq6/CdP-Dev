Thoses files were generated using `mongodump`.

Type these commands in the project root folder
- Dump data: `mongodump --uri "mongodb://localhost:27017/cdp-website" ./demo/`
- Restaure data: `mongorestore --db cdp-website ./demo/`