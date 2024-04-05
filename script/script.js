let brightness = document.getElementById("brightness"),
contrast = document.getElementById("contrast"),
saturate = document.getElementById("saturate"),
sepia = document.getElementById("sepia"),
grayScal = document.getElementById("grayscal"),
blur = document.getElementById("blur"),
hueRotat = document.getElementById("hue-rotat"),
listItem = document.querySelectorAll(".container .inputs ul li"),
allParent = document.querySelectorAll(".container .inputs div"),
allinput = document.querySelectorAll(".container .inputs div input"),
img = document.querySelector(".container .imges img"),
reset = document.querySelector(".container .btn button"),
download = document.querySelector(".container .btn a"),
uploadInp = document.querySelector(".container .imges input"),
uploadLab = document.querySelector(".container .imges label"),
canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");
window.onload = () => {
    reset.style.display = 'none';
    download.style.display = 'none';
}
uploadInp.onchange = () => {
    reset.style.display = 'block';
    download.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(uploadInp.files[0])
    file.onload = () => {
        img.src = file.result;
        uploadLab.style.display = 'none';
    }
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage( img,0,0,canvas.width,canvas.height)
        img.style.display = 'none';
    }
}
listItem.forEach( li => {
    li.onclick = function () {
        listItem.forEach( li => {
            li.classList.remove("active");
            this.classList.add("active");
        });
        allParent.forEach( div => {
            div.classList.remove("active")
        })
        document.querySelectorAll(this.dataset.filter).forEach( e => {
            e.classList.add("active");
        })
    }
})
allinput.forEach( input => {
    input.addEventListener("input" , () => {
        ctx.filter = `brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturate.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayScal.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotat.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})
download.onclick = () => {
    download.href = canvas.toDataURL("image/jpg")
}
reset.onclick = () => {
    brightness.value = '100';
    contrast.value = '100';
    saturate.value = '100';
    sepia.value = '0';
    blur.value = '0';
    hueRotat.value = '0';
    grayScal.value = '0';
    ctx.filter = "none"
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
}