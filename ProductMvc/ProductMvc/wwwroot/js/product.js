/* Get all products*/
$(document).ready(function () {
    GetProducts();
});

/* Read Data */
function GetProducts() {
    $.ajax({
        url:'/product/GetProducts',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (res) {
           
            if (res == null || res == undefined || res.length == 0) {
                let object = '';
                object += '<tr>';
                object += '<td colspan=5>' + 'Product not available' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);
            }
            else {
                let object = '';
            
                $.each(res, function (suffix, item) {
                   
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.productName + '</td>';
                    object += '<td>' + item.price + '</td>';
                    object += '<td>' + item.qty + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</a> <a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.id + ')">Delete</a></td>';

                });
                $('#tblBody').html(object);
            }
        },
        error: function () {
            alert('Unable to read data');
        }
    })
}

/* Add click function */
$('#btnAdd').click(function () {
    $('#ProductModal').modal('show');
    $('#modalTitle').text("Add Product");
});

/* Event driven validation check*/
$('#ProductName').change(function () {
    Validate();
})
$('#Price').change(function () {
    Validate();
});
$('#Qty').change(function () {
    Validate();
});

/* Insert Data*/
function Insert() {
    let resultOfValidation = Validate();
    if (!resultOfValidation) {
        return false;
    }
    let formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#Qty').val();

    $.ajax({
        url: '/product/Insert',
        data: formData,
        type: 'post',
        success: function (res) {
            if (res == null || res == undefined || res.length == 0) {
                alert('Unable to save')
            } else {
                HideModal();
                ClearData();
                GetProducts();
                alert(res);
            }
        },
        error: function () {
            alert('Unable to save');
        }

    });
}

/* Update Data*/
function Edit(id) {
    $.ajax({
        url: 'product/GetProductById?id='+id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType:'json',
        success: function (res) {
            if (res == null || res == undefined || res.length == 0) {
                alert('Unable to found the entry');
            } else {
                $('#ProductModal').modal('show');
                $('#modalTitle').text("Edit Product");
                $('#Update').css('display', 'block');
                $('#Save').css('display', 'none');
                PopulateData(res);    
            }
        },
        error: () => {
            alert('Unable to found the entry');
        }
    });
}
function Update() {
    let resultOfValidation = Validate();
    if (!resultOfValidation) {
        return false;
    }
    let formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#Qty').val();

    $.ajax({
        url: '/product/Update',
        data: formData,
        type: 'post',
        success: function (res) {
            if (res == null || res == undefined || res.length == 0) {
                alert('Unable to edit')
            } else {
                $('#Update').css('display', 'none');
                $('#Save').css('display', 'block');
                HideModal();
                ClearData();
                GetProducts();
                alert(res);
            }
        },
        error: function () {
            alert('Unable to edit');
        }

    });
}

/* Delete Data*/
function Delete(id) {
    
    $.ajax({
        url: 'product/GetProductById?id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: (res) => {
            if (res == null || res == undefined || res.length == 0) {
                alert('Unable to found the entry');
            } else {
                PopulateData(res);
                $('#modalBodyDelete').html('Are you sure you want to delete : ' + res.productName + '</br>' +'<div class="text-danger">You can not undo this change.</div>');
                $('#deleteModal').modal('show');
            }
        },
         error: () => {
            alert('Unable to found the entry');
        }
    });
}
function DeleteByModal() {
    let resultOfValidation = Validate();
    if (!resultOfValidation) {
        return false;
    }
    let formData = new Object();
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#Qty').val();

    $.ajax({
        url: '/product/Delete',
        data: formData,
        type: 'post',
        success: function (res) {
            if (res == null || res == undefined || res.length == 0) {
                alert('Unable to delete')
            } else {
                $('#deleteModal').modal('hide');
                ClearData();
                GetProducts();
                alert(res);
            }
        },
        error: function () {
            alert('Unable to delete');
        }

    });
}

/* Helper methods */
function PopulateData(res) {
    $("#Id").val(res.id);
    $('#ProductName').val(res.productName);
    $('#Price').val(res.price);
    $('#Qty').val(res.qty);
}
function Validate() {
    let isValid = true;

    if ($('#ProductName').val().trim() == '') {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    } else { $('#ProductName').css('border-color', 'lightgrey'); }

    if ($('#Price').val().trim() == '') {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    } else { $('#Price').css('border-color', 'lightgrey'); }

    if ($('#Qty').val().trim() == '') {
        $('#Qty').css('border-color', 'Red');
        isValid = false;
    } else { $('#Qty').css('border-color', 'lightgrey'); }

    return isValid;
}
function ClearData() {

    console.log('clearing...')
    $('#ProductName').val('');
    $('#Price').val('');
    $('#Qty').val('');
    $("#Id").val('');
}
function HideModal() {

    console.log('hiding...')
    $('#ProductModal').modal('hide');
    $('#ProductName').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#Qty').css('border-color', 'lightgrey');
    ClearData();
}