class AnimalTable {
  constructor(
    containerId,
    data,
    sortableColumns,
    nameStyle = "",
    instanceName
  ) {
    this.containerId = containerId;
    this.data = data;
    this.sortableColumns = sortableColumns;
    this.nameStyle = nameStyle;
    this.instanceName = instanceName;
    this.renderTable();
  }

  renderTable() {
    const container = document.getElementById(this.containerId);
    const table = `
            <table class="table table-bordered ">
                <thead>
                    <tr>
                        <th ${this.getSortHandler(0)}>Name</th>
                        <th>Image</th>
                        <th ${this.getSortHandler(1)}>Size</th>
                        <th ${this.getSortHandler(2)}>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data
                      .map(
                        (animal, index) => `
                        <tr>
                            <td class="${this.nameStyle}">${animal.name}</td>
                            <td><img src="${animal.image}" alt="${
                          animal.name
                        }"></td>
                            <td>${animal.size}</td>
                            <td>${animal.location}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="${this.getEditHandler(
                                  index
                                )}">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="${this.getDeleteHandler(
                                  index
                                )}">Delete</button>
                            </td>
                        </tr>`
                      )
                      .join("")}
                </tbody>
            </table>
        `;
    container.innerHTML = table;
  }

  getSortHandler(columnIndex) {
    return this.sortableColumns.includes(columnIndex)
      ? `onclick="${this.containerId}.sortTable(${columnIndex})"`
      : "";
  }

  getEditHandler(index) {
    return `${this.instanceName}.editAnimal(${index})`;
  }

  getDeleteHandler(index) {
    return `${this.instanceName}.deleteAnimal(${index})`;
  }

  sortTable(columnIndex) {
    this.data.sort((a, b) => {
      const aValue = Object.values(a)[columnIndex].toLowerCase();
      const bValue = Object.values(b)[columnIndex].toLowerCase();
      return aValue.localeCompare(bValue);
    });
    this.renderTable();
  }

  addAnimal() {
    const name = prompt("Enter Name:");
    const size = prompt("Enter Size:");
    const location = prompt("Enter Location:");

    if (!name || !size || !location) {
      alert("All fields are required!");
      return;
    }

    if (
      this.data.some(
        (animal) => animal.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Duplicate animal names are not allowed!");
      return;
    }

    this.data.push({ name, size, location, image });
    this.renderTable();
  }

  deleteAnimal(index) {
    this.data.splice(index, 1);
    this.renderTable();
  }

  editAnimal(index) {
    const animal = this.data[index];
    const name = prompt("Edit Name:", animal.name);
    const size = prompt("Edit Size:", animal.size);
    const location = prompt("Edit Location:", animal.location);

    if (!name || !size || !location) {
      alert("All fields are required!");
      return;
    }

    if (
      this.data.some(
        (a, i) => i !== index && a.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Duplicate animal names are not allowed!");
      return;
    }

    animal.name = name;
    animal.size = size;
    animal.location = location;
    this.renderTable();
  }
}


let bigCatsTable, dogsTable, bigFishTable;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    bigCatsTable = new AnimalTable(
      "bigCatsTableContainer",
      data.bigCatsData,
      [0, 1, 2],
      "",
      "bigCatsTable"
    );

    dogsTable = new AnimalTable(
      "dogsTableContainer",
      data.dogsData,
      [0, 2],
      "",
      "dogsTable"
    );

    bigFishTable = new AnimalTable(
      "bigFishTableContainer",
      data.bigFishData,
      [1],
      "",
      "bigFishTable"
    );
  })
  .catch((error) => console.error("Error loading JSON:", error));

