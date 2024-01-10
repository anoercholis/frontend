document.addEventListener('DOMContentLoaded', function() {
    fetchItems();
});

function fetchItems() {
	//const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMzg4NTQ0LCJpYXQiOjE3MDIzODgyNDQsImp0aSI6Ijk2NmYxMGRkODBhNDQ2NDhiMWI0Y2E5YmQxOTgwMDJjIiwidXNlcl9pZCI6MX0.k8HnJDtYjvcjrY3DoSiK6mfgM5CcysUv7mtcrmunpbQ';
    const token = localStorage.getItem('accessToken');
	fetch('http://127.0.0.1:8000/apia/item/' , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) // Ganti dengan URL API Anda
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Error:', error));
}

function displayItems(items) {
    const itemsContainer = document.getElementById('items');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-6');
        itemElement.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
					<button class="btn btn-primary update-btn" data-id="${item.id}"><i class="fas fa-edit"></i> Update</button>
					<button class="btn btn-danger delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i>Hapus</button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });
	
	// Tambahkan event listener ke tombol update
    //document.querySelectorAll('.update-btn').forEach(button => {
      //  button.addEventListener('click', function() {
        //    openUpdateModal(this.getAttribute('data-id'));
        //});
    //});
	
	
	document.querySelectorAll('.update-btn').forEach(button => {
    //console.log("Button ID:", button.getAttribute('data-id')); // Untuk debugging
    button.addEventListener('click', function() {
       // console.log("Clicked ID:", this.getAttribute('data-id')); // Debugging saat tombol diklik
        openUpdateModal(this.getAttribute('data-id'));
    });
});

}

function openUpdateModal(id) {
    // Ambil data item dari API atau dari list yang sudah ada
	console.log("ID yang diterima:", id);
	const token = localStorage.getItem('accessToken');
    fetch(`http://127.0.0.1:8000/apia/item/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // Isi formulir di modal dengan data yang ada
            document.getElementById('updateItemName').value = data.name;
            document.getElementById('updateItemDescription').value = data.description;
            document.getElementById('updateItemId').value = data.id;

            // Tampilkan modal
            $('#updateItemModal').modal('show');
        })
        .catch(error => console.error('Error:', error));
}

// Tambahkan event listener untuk submit form update di sini


