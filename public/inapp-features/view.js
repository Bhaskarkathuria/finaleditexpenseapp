const expense = document.getElementById("expense");
const description = document.getElementById("description");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const list = document.getElementById("list");
const list2 = document.getElementById("list2");
const payment = document.getElementById("payment");
const leaderboard = document.getElementById("premiumfeature");
const records = document.getElementById("records");

submit.addEventListener("click", onsubmit);
// list.addEventListener("click", deletelist);
payment.addEventListener("click", getpayment);
records.addEventListener("click", limitofrecords);

function limitofrecords(e) {
  e.preventDefault();
  const limit = records.value;
  localStorage.setItem("limit", limit);
}

function onsubmit(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  axios
    .post(
      "http://13.50.219.177/expenses",
      {
        date: new Date().toString().slice(4, 15),
        amount: expense.value,
        description: description.value,
        category: category.value,
      },
      { headers: { Authorization: token } }
    )
    .then((res) => {
      console.log("rrreesssppponnnnseee", res.body);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn btn-danger btn-sm");
      deleteButton.setAttribute("type", "button");
      deleteButton.appendChild(document.createTextNode("DELETE"));

      const tablerow = document.createElement("tr");
      tablerow.setAttribute("id", res.data.id);

      const date = document.createElement("td");
      date.appendChild(document.createTextNode(res.data.date));

      const description = document.createElement("td");
      description.appendChild(document.createTextNode(res.data.description));

      const category = document.createElement("td");
      category.appendChild(document.createTextNode(res.data.category));

      const income = document.createElement("td");
      income.appendChild(document.createTextNode(res.data.income));

      const expense = document.createElement("td");
      expense.appendChild(document.createTextNode(res.data.expense));

      const deleteB = document.createElement("td");
      deleteB.appendChild(deleteButton);

      tablerow.appendChild(date);
      tablerow.appendChild(description);
      tablerow.appendChild(category);
      tablerow.appendChild(income);
      tablerow.appendChild(expense);
      tablerow.appendChild(deleteB);

      const expensetable = document.getElementById("expensetable");
      expensetable.appendChild(tablerow);

      expensetable.addEventListener("click", deleterow);

      // expense.appendChild(deleteButton);

      // list.appendChild(expense);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleterow(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-danger")) {
    expensetable.removeChild(e.target.parentElement.parentElement);
  }
  console.log(e.target.parentElement.id);

  const token = localStorage.getItem("token");
  axios
    .delete(
      `http://13.50.219.177/expenses/${e.target.parentElement.parentElement.id}`,
      {
        headers: { Authorization: token },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function premiumusermessage() {
  document.getElementById("payment").style.visibility = "hidden";
  document.getElementById("list2").innerHTML = "You are a premium user";
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function loadExpense() {
  const page = localStorage.getItem("page");

  // clearing the existing expenses and pagination
  const expensetable = document.getElementById("expensetable");
  expensetable.innerHTML = "";
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  // Calling the API with the specified page number
  const token = localStorage.getItem("token");
  axios
    .get(
      `http://13.50.219.177/expenses?page=${page}&limit=${localStorage.getItem(
        "limit"
      )}`,
      {
        headers: { Authorization: token },
      }
    )
    .then((res) => {
      data = res.data;
      res.data.result.forEach((element) => {
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn btn-danger btn-sm");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("DELETE"));

        const tablerow = document.createElement("tr");
        tablerow.setAttribute("id", element.id);

        const date = document.createElement("td");
        date.appendChild(document.createTextNode(element.date));

        const description = document.createElement("td");
        description.appendChild(document.createTextNode(element.description));

        const category = document.createElement("td");
        category.appendChild(document.createTextNode(element.category));

        const income = document.createElement("td");
        income.appendChild(document.createTextNode(element.income));

        const expense = document.createElement("td");
        expense.appendChild(document.createTextNode(element.expense));

        const deleteB = document.createElement("td");
        deleteB.appendChild(deleteButton);

        tablerow.appendChild(date);
        tablerow.appendChild(description);
        tablerow.appendChild(category);
        tablerow.appendChild(income);
        tablerow.appendChild(expense);
        tablerow.appendChild(deleteB);

        const expensetable = document.getElementById("expensetable");
        expensetable.appendChild(tablerow);
        expensetable.addEventListener("click", deleterow);
      });

      const pagination = document.createElement("div");
      pagination.setAttribute("id", "pagination");

      const current = document.createElement("button");
      current.setAttribute("id", "current");
      current.setAttribute("type", "button");
      current.setAttribute("class", "pagination-button current-page");
      current.appendChild(
        document.createTextNode(`CurrentPage :${data.current}`)
      );
      pagination.appendChild(current);

      if (data.previous) {
        const previousbutton = document.createElement("button");
        previousbutton.setAttribute("id", "previousbutton");
        previousbutton.setAttribute("type", "button");
        previousbutton.setAttribute("class", "pagination-button");
        previousbutton.appendChild(document.createTextNode("PreviousPage"));
        previousbutton.addEventListener("click", (e) => {
          localStorage.setItem("page", data.previous);
          loadExpense();
        });
        pagination.appendChild(previousbutton);
      }

      if (data.next) {
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("id", "nextbutton");
        nextbutton.setAttribute("type", "button");
        nextbutton.setAttribute("class", "pagination-button");
        nextbutton.appendChild(document.createTextNode("NextPage"));
        nextbutton.addEventListener("click", (e) => {
          localStorage.setItem("page", data.next);
          loadExpense();
        });
        pagination.appendChild(nextbutton);
      }

      const container = document.getElementById("paginationContainer");
      container.innerHTML = "";
      container.appendChild(pagination);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const decodedtoken = parseJwt(token);
  console.log(decodedtoken);

  const isPremiumUser = decodedtoken.premiumUser;
  if (isPremiumUser === true) {
    premiumusermessage();

    const download = document.createElement("button");
    download.setAttribute("id", "downloadfeature");
    download.setAttribute("type", "button");
    download.appendChild(document.createTextNode("Download"));

    const leaderboard = document.createElement("button");
    leaderboard.setAttribute("id", "premiumfeature");
    leaderboard.setAttribute("type", "button");
    leaderboard.appendChild(document.createTextNode("Show LeaderBoard"));

    const exclusive = document.getElementById("premium");
    exclusive.appendChild(leaderboard);
    exclusive.appendChild(download);

    download.addEventListener("click", (e) => {
      e.preventDefault();
      axios
        .get("http://13.50.219.177/expenses/download", {
          headers: { Authorization: token },
        })
        .then((result) => {
          location.replace(result.data.Location);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    leaderboard.addEventListener("click", (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      axios
        .get("http://13.50.219.177/premiumfeatures", {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log("leadrboard response", response);
          i = 1;
          const leaderboard_data = response.data;
          // const leaderboardexpenselist = document.getElementById(
          //   "leaderboardexpenselist"
          // );
          const premiumtable = document.getElementById(
            "leaderboardexpenselist"
          );

          const table = document.createElement("table");
          table.setAttribute("border", "1");
          const tablebody = document.createElement("tbody");
          const tableheading = document.createElement("tr");
          const heading1 = document.createElement("th");
          heading1.appendChild(document.createTextNode("Rank"));
          const heading2 = document.createElement("th");
          heading2.appendChild(document.createTextNode("Name"));
          const heading3 = document.createElement("th");
          heading3.appendChild(document.createTextNode("TotalExpense"));
          tableheading.appendChild(heading1);
          tableheading.appendChild(heading2);
          tableheading.appendChild(heading3);
          table.appendChild(tableheading);

          leaderboard_data.forEach((user) => {
            const row = document.createElement("tr");
            row.setAttribute("id", user.id);

            const data1 = document.createElement("td");
            data1.appendChild(document.createTextNode(i));
            i++;

            const data2 = document.createElement("td");
            data2.appendChild(document.createTextNode(user.name));

            const data3 = document.createElement("td");
            data3.appendChild(document.createTextNode(user.totalexpense));

            row.appendChild(data1);
            row.appendChild(data2);
            row.appendChild(data3);
            table.appendChild(row);
            premiumtable.appendChild(table);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  const page = 1;
  localStorage.setItem("page", page);
  axios
    .get(
      `http://13.50.219.177/expenses?page=${page}&limit=${localStorage.getItem(
        "limit"
      )}`,
      {
        headers: { Authorization: token },
      }
    )
    .then((res) => {
      console.log("reeessss", res.data);
      data = res.data;
      res.data.result.forEach((element) => {
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn btn-danger btn-sm");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("DELETE"));

        const tablerow = document.createElement("tr");
        tablerow.setAttribute("id", element.id);

        const date = document.createElement("td");
        date.appendChild(document.createTextNode(element.date));

        const description = document.createElement("td");
        description.appendChild(document.createTextNode(element.description));

        const category = document.createElement("td");
        category.appendChild(document.createTextNode(element.category));

        const income = document.createElement("td");
        income.appendChild(document.createTextNode(element.income));

        const expense = document.createElement("td");
        expense.appendChild(document.createTextNode(element.expense));

        const deleteB = document.createElement("td");
        deleteB.appendChild(deleteButton);

        tablerow.appendChild(date);
        tablerow.appendChild(description);
        tablerow.appendChild(category);
        tablerow.appendChild(income);
        tablerow.appendChild(expense);
        tablerow.appendChild(deleteB);

        const expensetable = document.getElementById("expensetable");
        expensetable.appendChild(tablerow);
        expensetable.addEventListener("click", deleterow);
      });

      const pagination = document.createElement("div");
      pagination.setAttribute("id", "pagination");

      const current = document.createElement("button");
      current.setAttribute("id", "current");
      current.setAttribute("class", "pagination-button current-page");
      current.setAttribute("type", "button");
      current.appendChild(
        document.createTextNode(`CurrentPage${data.current}`)
      );
      pagination.appendChild(current);

      if (data.previous) {
        const previousbutton = document.createElement("button");
        previousbutton.setAttribute("id", "previousbutton");
        previousbutton.setAttribute("type", "button");
        previousbutton.setAttribute("class", "pagination-button");
        previousbutton.appendChild(document.createTextNode("PreviousPage"));
        previousbutton.addEventListener("click", (e) => {
          localStorage.setItem("page", data.previous);
          loadExpense();
        });
        pagination.appendChild(previousbutton);
      }

      if (data.next) {
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("id", "nextbutton");
        nextbutton.setAttribute("type", "button");
        nextbutton.setAttribute("class", "pagination-button");
        nextbutton.appendChild(document.createTextNode("NextPage"));
        nextbutton.addEventListener("click", (e) => {
          localStorage.setItem("page", data.next);
          loadExpense();
        });
        pagination.appendChild(nextbutton);
      }

      const container = document.getElementById("paginationContainer");
      container.innerHTML = "";
      container.appendChild(pagination);
    })
    .catch((err) => {
      console.log(err);
    });
});

function getpayment(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  console.log(token);
  axios
    .get("http://13.50.219.177/purchasePremium", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        // "premiumUser":response.isPremiumuser,
        // "payment_id":response.data.payment_id,
        handler: async function (response) {
          await axios
            .post(
              "http://13.50.219.177/trasactionstatus",
              {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              },
              { headers: { Authorization: token } }
            )
            .then((response) => {
              const newToken = response.data.token;
              localStorage.setItem("token", newToken);

              alert("you are a premium user Now");
              location.reload();

              const buyPremiumButton = document.getElementById("payment");
              const premiumUserText = document.createTextNode(
                "You are a premium user now"
              );
              buyPremiumButton.parentNode.replaceChild(
                premiumUserText,
                buyPremiumButton
              );

              const leaderboard = document.createElement("button");
              leaderboard.setAttribute("id", "premiumfeature");
              leaderboard.setAttribute("type", "button");
              leaderboard.appendChild(
                document.createTextNode("Show LeaderBoard")
              );

              // const download = document.createElement("button");
              // download.setAttribute("id", "downloadfeature");
              // download.setAttribute("type", "button");
              // download.appendChild(document.createTextNode("Download"));

              const exclusive = document.getElementById("premium");
              exclusive.appendChild(leaderboard);
              // exclusive.appendChild(download);

              localStorage.setItem("token", newToken);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      };

      const rzpl = new Razorpay(options);
      rzpl.open();
      e.preventDefault();

      rzpl.on("payment.faled", (response) => {
        console.log(response);
        alert("Something Went Wrong!");
      });
    });
}
