// script.js
$(document).ready(function () {
    function fetchUsers() {
      $.get('/users', function (users) {
        $('#userList').empty();
        users.forEach(function (user) {
          $('#userList').append(`<div>${user.name} - ${user.email} <button onclick="deleteUser('${user._id}')">Delete</button></div>`);
        });
      });
    }
  
    $('#addUserForm').submit(function (event) {
      event.preventDefault();
      const name = $('#name').val();
      const email = $('#email').val();
  
      $.post('/users', { name, email }, function () {
        fetchUsers();
        $('#addUserForm')[0].reset();
      });
    });
  
    window.deleteUser = function (userId) {
      $.ajax({
        url: `/users/${userId}`,
        type: 'DELETE',
        success: function () {
          fetchUsers();
        }
      });
    };
  
    fetchUsers();
  });
  