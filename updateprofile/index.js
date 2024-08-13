function readFile(){
    let reader = new FileReader()
    let file = document.getElementById('profileImgInput').files[0]

    reader.onload = function(event){
        document.getElementById('outputImage').src = event.target.result
    }

    reader.readAsDataURL(file)
}

document.getElementById('profileImgInput').addEventListener('change', readFile)