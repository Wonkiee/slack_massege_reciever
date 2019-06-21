let URL = "http://localhost:9090/api/v1/targets";
//let URL = ('http://localhost:9090/api/v1/query=promhttp_metric_handler_requests_total{code="200"}');

getStats = () => {
  fetch(URL, {
    method: "get",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(response) {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

onClick = () => {
  getStats();
};
