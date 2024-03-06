var searchData = [
    { title: "California FBLA Competitive Events Planning Worksheet_2324.xlsx", category: "2023-2024" },
    { title: "2023-2024 California Competitive Event Guidelines.pdf", category: "2023-2024" },
    { title: "Interview Events (Starting at Section)", category: "Events Starting at Section" },
    { title: "Events Starting at State", category: "Events Starting at State" }
    // Add more sample data as needed
];

function performSearch() {
    var searchTerm = document.getElementById("search").value.toLowerCase();
    var searchResults = [];

    for (var i = 0; i < searchData.length; i++) {
        var title = searchData[i].title.toLowerCase();
        var category = searchData[i].category.toLowerCase();

        if (title.includes(searchTerm) || category.includes(searchTerm)) {
            searchResults.push(searchData[i]);
        }
    }

    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    var resultContainer = document.getElementById("search-results");
    resultContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultContainer.innerHTML = "<p>No results found.</p>";
    } else {
        for (var i = 0; i < results.length; i++) {
            var resultItem = document.createElement("div");
            resultItem.className = "search-result";
            resultItem.innerHTML = "<p>Title: " + results[i].title + "</p><p>Category: " + results[i].category + "</p>";
            resultContainer.appendChild(resultItem);
        }
    }
}
