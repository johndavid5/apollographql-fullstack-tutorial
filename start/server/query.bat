curl -v -X POST http://localhost:4000 --header "Content-Type: application/json" -d @%1 | py -m json.tool | tee q.out
