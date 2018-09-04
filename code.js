//Created by Auragar

document.getElementById("in").onchange = function(){
	if((this.files[0].size/1024)/1024 < 1){
		var fR = new FileReader;

		fR.onload = function(){
			var input = new Image;

			input.onload = function(){
				var iC = document.getElementById("inCanvas");
				iC.width = input.width;
				iC.height = input.height;
				var iCtx = iC.getContext("2d");
				iCtx.drawImage(input, 0, 0);
				var iID = iCtx.getImageData(0, 0, iC.width, iC.height);
				var len = iID.data.length;
				var iPRGBAA = [];

				for(var i = 0; i < len; i += 4){
					if(iID.data[i + 3] > 0) iPRGBAA.push(iID.data[i] + "," + iID.data[i + 1] + "," + iID.data[i + 2] + "," + iID.data[i + 3]);
				}

				iPRGBAA = Array.from(new Set(iPRGBAA));

				var iPRGBAAL = iPRGBAA.length;

				if(iPRGBAAL < 100000){
					oC = document.getElementById("outCanvas");
					oCU = Math.ceil(Math.sqrt(iPRGBAAL));
					oCS = oCU * 5;
					oC.width = oCS;
					oC.height = oCS;
					oCtx = oC.getContext("2d");

					var cur;

					for(var i = 0; i < oCU; i++){
						for(var j = 0; j < oCU; j++){
							cur = (i * oCU) + j;

							if(cur < iPRGBAAL){
								oCtx.fillStyle = "rgba(" + iPRGBAA[cur] + ")";
								oCtx.fillRect(j * 5, i * 5, 5, 5);
							}
							else{
								oCtx.fillStyle = "rgba(0, 0, 0, 0.0)";
							}
						}
					}
				}
				else{
					alert("Image palette is too large.");
				}
			}

			input.src = fR.result;
		}

		fR.readAsDataURL(this.files[0]);

		this.value = null;
		this.blur();
	}
	else{
		alert("Image size is too large.");
	}
};
