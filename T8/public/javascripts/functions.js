function showImage(name, type){
    
    if(type == 'image/png' || type == 'image/jpeg')
        var ficheiro = '<div class="container"><div class=row"><div class="col-sm"><img src="/fileStore/' + name + '" width=30%></div>'
    else
        var ficheiro = '<p>' + name + ', ' + type + '</p>'


    var fileObj = $(`
                ${ficheiro}
                <div class="col-sm">
                <p><b>Filename:</b> ${name}</p>
                <p><b>Mimetype:</b> ${type}</p>
                </div>
                </div>
                </div>

  
    `)
    
    var download = $('<div><button class="btn"><a href="/files/download/' + name + '">Download</a></button></div>')
    $('#displayBody').empty()
    $('#displayBody').append(fileObj, download)
    
}

$(document).on('click','#oneMore',function () {
    $('#uploadFiles').append('<div id="oneMoreFile"><div class="form-group" style="background-color: #f5ebf1"> <label for="description"> Description </label><input type="text" id="description" class="form-control" name="desc"></div><div class="form-group" style="background-color: #f5ebf1"> <label for="selectFiles"> Select file </label><input type="file" id="selectFiles" name="myFile"></div><span style="margin:2px"><input class="btn btn-circle btn-lg btn-light" type="button" id="remove" value="&#xf1f8;"></span></div>');      
});

$(document).on('click', "#remove", function() {
    $('#oneMoreFile').remove();

});
