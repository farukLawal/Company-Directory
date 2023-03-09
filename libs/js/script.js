// ------------------------------------------- DOCUMENT READY FUNCTION ------------------------------------------- // 
$(window).on('load', function() {
  // Remove the pre-loader when the document is ready
  $("#preloader").fadeOut(2000);

// ------------------------------------------- POPULATING TABLES START ------------------------------------------- // 
// Get all users and populate table 
function populateEmployeeTable(data) {
  $('#table-body-employees').empty();

  data.forEach(person => {
    let jobTitleCell = '';

    if (person.jobTitle === '') {
      jobTitleCell = `<td class="table-cell d-none d-sm-table-cell">N/A</td>`;
    } else {
      jobTitleCell = `<td id="employeeJobTitle${person.id}"class="table-cell d-none d-sm-table-cell">${person.jobTitle}</td>`;
    }

    let tableRow = `
    <tr class="table-row">
      <td id="lastName${person.id}"class="table-cell " >${person.firstName} ${person.lastName}</td>
      
      ${jobTitleCell}
      <td id="employeeDepartment${person.id}"class="table-cell d-none d-sm-table-cell">${person.department}</td>
      <td id="employeeLocation${person.id}" class="table-cell d-none d-sm-table-cell">${person.location}</td>
      <td id="employeeEmail${person.id}" class="table-cell d-none d-sm-table-cell">${person.email}</td>
  
      <td align="center">
      <button type="button" class="btn btn-outline-success btn-sm update-employee-btn" data-bs-toggle="modal" data-bs-target="#update-employee-modal" value=${person.id}>
        <i class="fas fa-pencil-alt"></i>
      </button>
    </td align="center">
    
    <td align="center">
      <button type="button" class="btn btn-outline-danger btn-sm del-employee-btn" value=${person.id}>
        <i class="fas fa-trash"></i>
      </button>
    </td>
  
    </tr>`

    $('#table-body-employees').append(tableRow);
  });
}


function maintable() {
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
    
      if (result.status.name == "ok") {
        populateEmployeeTable(result.data);
        // console.log(result.data)
      }
    
  },
  error: function(jqXHR, textStatus, errorThrown) {
       console.log(errorThrown);
  }
});
}

maintable()


// Get all locations and populate table 
function populateLocationTable() {


  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {

      populateLocationTableFunction(result.data);
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
         console.log(errorThrown);
    }
  });
}

  function populateLocationTableFunction(locationData) {
    $('#department-add-location, #update-department-location').empty();
    $('.location-sort').empty();
    $('#table-body-locations').empty();
  
        locationData.forEach(location => {
          let locationRow = `
          <tr class="table-row">
          <td id="locationName${location.id}" class="table-cell">${location.name}</td>
      
          <td align="center">
            <button type="button" class="btn btn-outline-success btn-sm update-Location-btn" data-bs-toggle="modal" data-bs-target="#update-location-modal" value=${location.id}>
              <i class="fas fa-pencil-alt"></i>
            </button>
          </td align="center">
        
          <td align="center">
            <button type="button" class="btn btn-outline-danger btn-sm del-location-btn" value=${location.id}>
              <i class="fas fa-trash"></i>
            </button>
          </td>
      
        </tr>
          `;
          let sortLocations = `<button type="button" class="list-group-item list-group-item-action location-select" value="${location.id}">${location.name}</button>`;

          
          $('#department-add-location, #update-department-location').append(`<option value="${location.id}">${location.name}</option>`);
          $('#table-body-locations').append(locationRow);
          $('.location-sort').append(sortLocations);
        })
  
  }


populateLocationTable()

// Get all departments and populate table AJAX CALL 
function populateDepartmentTable() {
  
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {

      populateDepartmentTableFunction(result.data);

    },
    error: function(jqXHR, textStatus, errorThrown) {
         console.log(errorThrown);
    }
  });

  function populateDepartmentTableFunction(departmentData) {
    $('#department-location-name, #update-department-location-name').empty();
    $('.dapartment-sort').empty();
    $('#table-body-department').empty();
  departmentData.forEach(department => {

    let departmentTable = `
    <tr class="table-row">
    <td id="departmentName${department.id}" class="table-cell">${department.department_name}</td>
    <td id="departmentLocation${department.id}" class="table-cell hide-LID">${department.location_name}</td>


    <td align="center">
    <button type="button" class="btn btn-outline-success btn-sm update-department-btn" data-bs-toggle="modal" data-bs-target="#update-department-modal" value=${department.id}>
      <i class="fas fa-pencil-alt"></i>
    </button>
  </td align="center">

  <td align="center">
    <button type="button" class="btn btn-outline-danger btn-sm del-department-btn" value=${department.id}>
      <i class="fas fa-trash"></i>
    </button>
  </td>

  </tr>
  `;
  let sortDepartments = `<button type="button" class="list-group-item list-group-item-action department-select" value="${department.id}">${department.department_name}</button>`

  $('#department-location-name, #update-department-location-name').append(`<option value="${department.id}">${department.department_name} - ${department.location_name}</option>`);
  $('#table-body-department').append(departmentTable);
  $('.dapartment-sort').append(sortDepartments);
})

}
}

populateDepartmentTable()

// ------------------------------------------- MAIN BUTTONS (EMPLOYEE, LOCATION, DEPARTMENT) ------------------------------------------- // 
function mainButtons(btnId) {
  $(`${btnId}`).on('click', function() { 
    
    if(btnId === '#employee-btn') {
      // hide the location + department table (with the styles)
      $("#locationTable").css("display", "none");
      $("#departmentTable").css("display", "none");
      $("#employeeTable").css("display", "table");
      $('#add-based-on-table').attr('data-bs-target', '#employee-modal');
      $("#employee-search").removeAttr('disabled');
      $("#employee-search").attr("placeholder", 'Search employees')
      $("#employee-search").css("cursor", "text");
      $('.dropdown button').prop('disabled', false);

    } else if (btnId === '#location-btn') {
      // hide the employee + department table (with the styles)
      $("#employeeTable").css("display", "none");
      $("#departmentTable").css("display", "none");
      $("#locationTable").css("display", "table");
      $('#add-based-on-table').attr('data-bs-target', '#location-modal');
      $("#employee-search").attr('disabled', '');
      $("#employee-search").attr("placeholder", '')
      $("#employee-search").val("")
      $("#employee-search").css("cursor", "not-allowed");
      $('.dropdown button').prop('disabled', true);

    } else {
      // hide the location + employee table (with the styles)
      $("#employeeTable").css("display", "none");
      $("#locationTable").css("display", "none");
      $("#departmentTable").css("display", "table");
      $('#add-based-on-table').attr('data-bs-target', '#department-modal');
      $("#employee-search").attr('disabled', '');
      $("#employee-search").attr("placeholder", '')
      $("#employee-search").val("")
      $("#employee-search").css("cursor", "not-allowed");
      $('.dropdown button').prop('disabled', true);
    }
  })

}

mainButtons('#employee-btn')
mainButtons('#location-btn')
mainButtons('#department-btn')

function clearErrorText() {
  $(document).on('click', '#add-based-on-table', function() {
    $('#location-error-text').html('')
    $('#user-error-text').html('')
    $('#department-error-text').html('')
  });
}

clearErrorText()

// ------------------------------------------- LOCATION CRUD ------------------------------------------- //
//Add Location 
$("#add-loc").on('click', function() {
  $("#confirm-location-btn").prop("disabled", !$(this).is(':checked'));
});

$('#add-location-form').on('submit', function(e) {
    
  e.preventDefault();

  let locationValue = String($('#add-location').val())
  
  if(locationValue.length <= 1){
    $('#location-error-text').html('Please enter a valid location')
   
  } else {

    $('#location-modal').modal('hide');

    $.ajax({
      url: "libs/php/insertLocation.php",
      type: 'POST',
      dataType: 'json',
      data: {
        location: locationValue
      },
      success: function(result) {
        if (result.status.name == "ok") {
          $('#location-modal').modal('hide');
          populateLocationTable()
          $('#success-message').html(`Location: ${locationValue}`)
          $('#success-modal').modal('show')
          
          //clearing the values of the location form after submit
          $('#add-location').val('')
          
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
           console.log(errorThrown);
      }
    });
    
  }
})

$('#location-modal').on('shown.bs.modal', function () {
  $('#add-loc').prop('checked', false);
  $('#confirm-location-btn').prop('disabled', true);

  $('#add-location').focus();
});

//hidden edit button 
$('#location-modal').on('hidden.bs.modal', function () {

  $('#location-error-text').html('')
  // $("#update-location").val("");
  $('#add-location-form')[0].reset();
  
});




//Update/Edit Location
$("#updt-loc").on('click', function() {
  $("#update-location-modal-btn").prop("disabled", !$(this).is(':checked'));
});

$(document).on('click', '.update-Location-btn', function() {
  // let locationID = $('#update-location-modal-btn').val();
  // console.log(locationID)

  $.ajax({
    url: "libs/php/getLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: $(this).val()
    },
    success: function (result) {
  
      if (result.status.name == "ok") {

        // console.log(result.data)
        
        // $('#update-location').val(`${result.data["department"][0]["name"]}`);
        $('#update-location').val(`${result.data["personnel"][0]["name"]}`);
      } 

    },
    error: function (jqXHR, textStatus, errorThrown) {
        // your error code
        // console.log(errorThrown);
        // console.log(textStatus);
        // console.log(jqXHR);   
        $('#location-update-error-text').html("Error retrieving data");
    }
  });

  $('#update-location-modal-btn').val($(this).val());
});


$('#edit-location-form').on("submit", function(e) {

  
  e.preventDefault();

  let locationName = $('#update-location').val();
  let id = $('#update-location-modal-btn').val();

  // console.log(id)

  if(locationName === '') {
    $('#location-update-error-text').html('Please enter a valid location name in order to update')
  } else {
      $.ajax({
          url: "libs/php/updateLocationByID.php",
          type: 'POST',
          dataType: 'json',
          data: {
             locationName: locationName,
             id: id
          },
          success: function(result) {
              if (result.status.name == "ok") {

                  $("#update-location-modal").modal('hide');
                  populateLocationTable()
                  // populateEmployeeTable()
                  maintable()
                  populateDepartmentTable()

                  $('#edit-message').html(`Location: ${locationName}`)
                  $('#edit-modal').modal('show')
              }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // your error code
              console.log(errorThrown);
              console.log(textStatus);
              console.log(jqXHR);      
          }
          });
      }

      $('#edit-message').html('')
})

// shown edit button
$('#update-location-modal').on('shown.bs.modal', function () {
  $('#updt-loc').prop('checked', false);
  $('#update-location-modal-btn').prop('disabled', true);

  $('#update-location').focus();
});

//hidden edit button 
$('#update-location-modal').on('hidden.bs.modal', function () {

  $('#location-update-error-text').html('')
  // $("#update-location").val("");
  // $('#exampleForm')[0].reset();
  
});


//Delete Location 
function deleteLocation(locationId) {
    let location = locationId
        
    $.ajax({
        url: "libs/php/deleteLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: location,
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
              // console.log(result)
              populateLocationTable()
              $('#delete-message').html(`Location successfully deleted`)
              $('#delete-modal').modal('show')
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);      
        }
        });

        $('#delete-message').html('')
}



let locationIdCount

$(document).on('click', '.del-location-btn', function() {
  locationIdCount = $(this).val();
  // console.log(locationIdCount)

  $.ajax({
    url: "libs/php/countDepartments.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: locationIdCount
    },
    success: function(result) {
      if (result.status.name == "ok") {

        let deptcount = result.data[0].count

        if(deptcount == 0) {

          $.ajax({
            url: "libs/php/getLocationByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                locationID: locationIdCount,
            },
            success: function(result) {
                if (result.status.name == "ok") {
                    $("#update-location").val("");

                    // deleteLocation(locationIdCount) 
                    // $('#delete-warning-modal .modal-title').html(`Delete: ${result.data["personnel"][0]["name"]}`);
                    $('#delete-warning-message').html(`Are you sure you want to delete: ${result.data["personnel"][0]["name"]}`)
                    $('#delete-warning-modal').modal('show')

                    // $('#update-location').val(`${result.data["personnel"][0]["name"]}`);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);      
            }
            });


          $(document).on('click', '#delete-button-location', function() {
            // let locationIdCount = locationIdCount 
          
          
            $.ajax({
              url: "libs/php/countDepartments.php",
              type: 'POST',
              dataType: 'json',
              data: {
                id: locationIdCount
              },
              success: function(result) {
                if (result.status.name == "ok") {
          
                  let deptcount = result.data[0].count
          
                  if(deptcount == 0) {

                    deleteLocation(locationIdCount) 
                    // $('#delete-warning-modal').modal('show')
          
                  }
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  // your error code
                  console.log(errorThrown);
                  console.log(textStatus);
                  console.log(jqXHR);      
              }
            });
          });


        } else {
          $('#warning-message').html('')
          $('#warning-message').html('You cannot delete this location as it is associated with a department')
          $('#warning-modal').modal('show')
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);      
    }
  });
});


// ------------------------------------------- DEPARTMENT CRUD ------------------------------------------- //
//Add Department
$("#add-dept").on('click', function() {
  $("#confirm-department-btn").prop("disabled", !$(this).is(':checked'));
});

$('#add-department-form').on('submit', function(e) {

  e.preventDefault();

  let departmentName = $('#add-department').val();
  let location = $('#department-add-location').val();

  if(departmentName === '') {
      $('#department-error-text').html('Please fill in a valid department name')
  } else {
    $.ajax({
      url: "libs/php/insertDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
         name: departmentName,
         locationID: location,
      },
      success: function(result) {
          if (result.status.name == "ok") {
            $('#department-modal').modal('hide');
            populateDepartmentTable()

            $('#success-message').html(`Department: ${departmentName}`)
            $('#success-modal').modal('show')

            //clearing the values of the location form after submit
            $('#add-department').val('')
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      });
  }
})


$('#department-modal').on('shown.bs.modal', function () {
  $('#add-dept').prop('checked', false);
  $('#confirm-department-btn').prop('disabled', true);

  $('#add-department').focus();
});

//hidden edit button 
$('#department-modal').on('hidden.bs.modal', function () {

  $('#department-error-text').html('')
  // $("#update-department").val("");
  $('#add-department-form')[0].reset();
  
});


//update department
$("#updt-dept").on('click', function() {
  $("#update-department-modal-btn").prop("disabled", !$(this).is(':checked'));
});

$(document).on('click', '.update-department-btn', function() {

  $('#department-update-error-text').html('')

  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
        departmentID:  $(this).val(),
    },
    success: function(result) {
        if (result.status.name == "ok") {
            $("#update-department").val("");

            //placeholder value
            // $('#update-department').attr("placeholder", `${result.data[0]["name"]}`);

            // console.log(result.data[0])
            //form value 
            $('#update-department').val(`${result.data[0]["name"]}`);
            $('#update-department-location').val(result.data[0].locationID).change();
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR); 
        $('#department-update-error-text').html("Error retrieving data");     
    }
    });
$('#update-department-modal-btn').val($(this).val());
// $('#update-department-modal').modal('show');

});

$('#edit-department-form').on("submit", function(e) {
  e.preventDefault();

  let departmentName = $('#update-department').val();
  let location = $('#update-department-location').val();
  let id = $('#update-department-modal-btn').val();

  if(departmentName === '') {
    $('#department-update-error-text').html('Please enter a valid department name in order to update')
  } else { 

    $.ajax({
      url: "libs/php/updateDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
         departmentName: departmentName,
         location: location,
         id: id
      },
      success: function(result) {
          if (result.status.name == "ok") {
              $("#update-department-modal").modal('hide');
              populateDepartmentTable()
              // populateEmployeeTable()
              maintable()
            
              $('#edit-message').html(`Department: ${departmentName}`)
              $('#edit-modal').modal('show')
              
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      });

  }

  $('#edit-message').html('')
})


$('#update-department-modal').on('shown.bs.modal', function () {
  $('#updt-dept').prop('checked', false);
  $('#update-department-modal-btn').prop('disabled', true);

  $('#update-department').focus();
});

//hidden edit button 
$('#update-department-modal').on('hidden.bs.modal', function () {
  $('#department-update-error-text').html('')
  // $("#update-department").val("");
  // $('#exampleForm')[0].reset();
  
});


//delete department 
function deleteDepartment(departmentId) {
      let department = departmentId

      $.ajax({
          url: "libs/php/deleteDepartmentByID.php",
          type: 'POST',
          dataType: 'json',
          data: {
              id: department,
          },
          success: function(result) {
              if (result.status.name == "ok") {
                  populateDepartmentTable()
                  $('#delete-message').html(`Department successfully deleted`)
                  $('#delete-modal').modal('show')
              }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // your error code
              console.log(errorThrown);
              console.log(textStatus);
              console.log(jqXHR);      
          }

  });
  }

  let departmentIdCount

  $(document).on('click', '.del-department-btn', function() {
    departmentIdCount = $(this).val();
  
    $.ajax({
      url: "libs/php/countEmployees.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: departmentIdCount
      },
      success: function(result) {
        if (result.status.name == "ok") {
  
          let employeeCount = result.data[0].count
  
          if(employeeCount == 0) {
            // deleteDepartment(departmentIdCount)
            $.ajax({
              url: "libs/php/getDepartmentByID.php",
              type: 'POST',
              dataType: 'json',
              data: {
                  departmentID:  departmentIdCount
              },
              success: function(result) {
                  if (result.status.name == "ok") {
                      // $("#update-department").val("");
          
                      $('#delete-warning-department-message').html(`Are you sure you want to delete: ${result.data[0]["name"]}`)
                      $('#delete-warning-department-modal').modal('show')
          
          
                      //form value 
                      // $('#update-department').val(`${result.data[0]["name"]}`);
                  }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  // your error code
                  console.log(errorThrown);
                  console.log(textStatus);
                  console.log(jqXHR);      
              }
              });


              $(document).on('click', '#delete-button-department', function() {
                // let locationIdCount = locationIdCount 
              
              
                $.ajax({
                  url: "libs/php/countEmployees.php",
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    id: departmentIdCount
                  },
                  success: function(result) {
                    if (result.status.name == "ok") {
              
                      let employeeCount = result.data[0].count
              
                      if(employeeCount == 0) {
    
                        deleteDepartment(departmentIdCount)
                        // $('#delete-warning-modal').modal('show')
              
                      }
                    }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                      // your error code
                      console.log(errorThrown);
                      console.log(textStatus);
                      console.log(jqXHR);      
                  }
                });
              });




  
          } else {
            $('#warning-message').html('')
            $('#warning-message').html('You cannot delete this department as it has employees associated with it')
            $('#warning-modal').modal('show')
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
    });
  });


// ------------------------------------------- EMPLOYEE/PERSONNEL CRUD ------------------------------------------- //
//Add Employees 
$("#add-emp").on('click', function() {
  $("#confirm-employee-btn").prop("disabled", !$(this).is(':checked'));
});

$('#add-employee-form').on('submit', function(e) {
  e.preventDefault();

  let firstName = $('#first-name').val();
  let lastName = $('#last-name').val();
  let jobTitle = $('#job-title').val();
  let EmailAddress = $('#employee-email').val();
  let departmentId = $('#department-location-name').val();
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  let email = $('#employee-email').val()

  if (firstName  === '' || lastName === '' || jobTitle === '' || !regex.test(email)) {
    $('#user-error-text').html('Please enter a valid first name, last name, job title and email address')
  } else {
    $.ajax({
      url: "libs/php/insertEmployee.php",
      type: 'POST',
      dataType: 'json',
      data: {
         firstName: firstName,
         lastName: lastName,
         jobTitle: jobTitle,
         departmentID: departmentId,
         email: EmailAddress
      },
      success: function(result) {
          if (result.status.name == "ok") {
              $('#employee-modal').modal('hide');
              // populateEmployeeTable()
              maintable()
              
              $('#success-message').html(`First Name: ${firstName},</br>Last Name: ${lastName},</br> Job Title: ${jobTitle},</br> Email Address: ${EmailAddress}</br>`)
              $('#success-modal').modal('show')

              //clearing the values of first name, last name and email forms after submit
              $('#first-name').val('');
              $('#last-name').val('');
              $('#employee-email').val('');
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      });

  }
})

$('#employee-modal').on('shown.bs.modal', function () {
  $('#add-emp').prop('checked', false);
  $('#confirm-employee-btn').prop('disabled', true);

  $('#first-name').focus();
});

//hidden edit button 
$('#employee-modal').on('hidden.bs.modal', function () {

  $('#user-error-text').html('')
  $('#job-title').val('')
  
  // $("#update-department").val("");
  $('#add-employee-form')[0].reset();
  
});


//update employee 
$("#updt-emp").on('click', function() {
  $("#update-employee-modal-btn").prop("disabled", !$(this).is(':checked'));
});

$(document).on('click', '.update-employee-btn', function() { 
  $('#update-employee-error-text').html('')
  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
        employeeID:  $(this).val(),
    },
    success: function(result) {
        if (result.status.name == "ok") {
          $("#update-first-name").val("");
          $("#update-last-name").val("");
          $("#update-employee-email").val("");
          
          //placeholder value 
          // $('#update-first-name').attr("placeholder", `${result.data["personnel"][0]["firstName"]}`);
          // $('#update-last-name').attr("placeholder", `${result.data["personnel"][0]["lastName"]}`);
          // $('#update-job-title').attr("placeholder", `${result.data["personnel"][0]["jobTitle"]}`);
          // $('#update-employee-email').attr("placeholder", `${result.data["personnel"][0]["email"]}`);

          //form value 
          $('#update-first-name').val(`${result.data["personnel"][0]["firstName"]}`);
          $('#update-last-name').val(`${result.data["personnel"][0]["lastName"]}`);
          $('#update-job-title').val(`${result.data["personnel"][0]["jobTitle"]}`);
          $('#update-employee-email').val(`${result.data["personnel"][0]["email"]}`);

          // console.log(result.data["personnel"][0].departmentID)
          $('#update-department-location-name').val(result.data["personnel"][0].departmentID).change();
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);  
        $('#update-employee-error-text').html("Error retrieving data");    
    }
    });

    $('#update-employee-modal-btn').val($(this).val());
    // $('#update-employee-modal').modal('show');

}); 


$('#edit-employee-form').on("submit", function(e) {
  e.preventDefault();

  let firstName = $('#update-first-name').val();
  let lastName = $('#update-last-name').val();
  let jobTitle = $('#update-job-title').val();
  let EmailAddress = $('#update-employee-email').val();
  let departmentId = $('#update-department-location-name').val();
  let id = $('#update-employee-modal-btn').val()
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  let emailCheck = $('#update-employee-email').val()

  
  if(firstName === '' || lastName === '' || jobTitle === '' || !regex.test(emailCheck)) { 
  
    $('#update-employee-error-text').html('Please enter a valid first name, last name, job title and email address in order to update employee')

  } else { 
  
    $.ajax({
      url: "libs/php/updatePersonnelByID.php",
      type: 'POST',
      dataType: 'json',
      data: {
         firstName: firstName,
         lastName: lastName,
         jobTitle: jobTitle,
         departmentId: departmentId,
         email: EmailAddress,
         id: id 
      },
      success: function(result) {
          if (result.status.name == "ok") {
              $('#update-employee-modal').modal('hide');
              // populateEmployeeTable()
              maintable()

              $('#edit-message').html(`First Name: ${firstName},</br>Last Name: ${lastName},</br> Job Title: ${jobTitle},</br> Email Address: ${EmailAddress}</br>`)
              $('#edit-modal').modal('show')
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      }); 
    }

    $('#edit-message').html('')
})

$('#update-employee-modal').on('shown.bs.modal', function () {
  $('#updt-emp').prop('checked', false);
  $('#update-employee-modal-btn').prop('disabled', true);

  $('#update-first-name').focus();
});

//hidden edit button 
$('#update-employee-modal').on('hidden.bs.modal', function () {

  $('#update-employee-error-text').html('')
  $('#update-job-title').val('')
  
  // $("#update-department").val("");
  // $('#exampleForm')[0].reset();
  
});


//Delete employee 

function deleteEmployee(employeeID) {
  // let employeeIdCount = $(this).val();
  let employee = employeeID 

  $.ajax({
    url: "libs/php/deleteEmployeeByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      EmployeeID: employee
    },
    success: function(result) {
      if (result.status.name == "ok") {
        // populateEmployeeTable()
        maintable()

        $('#delete-message').html(`Employee successfully deleted`)
        $('#delete-modal').modal('show')
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);      
    }
  });
}

let employeeIdCount

$(document).on('click', '.del-employee-btn', function() {
  employeeIdCount = $(this).val();

  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      employeeID: employeeIdCount
    },
    success: function(result) {
      if (result.status.name == "ok") {
        // console.log(result.data)
        $('#delete-warning-employee-message').html(`Are you sure you want to delete: ${result.data["personnel"][0]["firstName"]} ${result.data["personnel"][0]["lastName"]}`)
        $('#delete-warning-employee-modal').modal('show')

        $(document).on('click', '#delete-button-employee', function() {

          deleteEmployee(employeeIdCount)

        })

      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);      
    }
  });
  
}); 


// ------------------------------------------- SEARCH/SORT ------------------------------------------- //

//Search by first and last name 
$('#employee-search').on('keyup', function() {
  let search = $(this).val();

  if (search != "") {
  
    $.ajax({
    url: "libs/php/searchEmployee.php",
    type: 'GET',
    dataType: 'json',
    data: {
      search: search, 
    },
    success: function(result) {
      if (result.status.name == "ok") {
        if (result['data'].length > 0){
          populateEmployeeTable(result['data'])
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);      
    },
    });



} else if (search == '' || search.trim() == ''){
  // populateEmployeeTable()
  maintable()
}

});


//sort by department 
$(document).on('click', '.department-select', function() {

  $('#sort-department-modal').modal('hide');
  $.ajax({
      url: "libs/php/searchByDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
        search:  $(this).text(),
      },
      success: function(result) {
          if (result.status.name == "ok") {
            
              if (result['data'].length > 0){
                // populateTableSearch(result['data']);
                populateEmployeeTable(result['data']);
              } else {
                //modal saying there are no employees in this department
                $('#warning-message').html('There are no employees in this department')
                $('#warning-modal').modal('show')
              }

          
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      });
  });

//sort by location

$(document).on('click', '.location-select', function() {

  $('#sort-location-modal').modal('hide');
  $.ajax({
      url: "libs/php/searchByLocation.php",
      type: 'POST',
      dataType: 'json',
      data: {
        search:  $(this).text(),
      },
      success: function(result) {
          if (result.status.name == "ok") {
            
              if (result['data'].length > 0){
                // populateTableSearch(result['data']);
                populateEmployeeTable(result['data']);
              } else {
                // modal saying there are no employees in this location 
                $('#warning-message').html('There are no employees in this location')
                $('#warning-modal').modal('show')
              }

          
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(errorThrown);
          console.log(textStatus);
          console.log(jqXHR);      
      }
      });
  });

// ------------------------------------------- REFRESH BUTTON ------------------------------------------- //

$('#refresh-btn').on('click', function() {
  // populateEmployeeTable()
  maintable()

})

});































































































