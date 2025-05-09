const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    $(canvas).on('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    $(canvas).on('mousemove', function(e) {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    $(canvas).on('mouseup', function() {
        isDrawing = false;
    });

    function clearPad() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $('#result').html('');
    }

    function saveSignature() {
        const dataURL = canvas.toDataURL();
        
        $.ajax({
            url: 'save_signature.php',
            type: 'POST',
            data: { signature: dataURL },
            success: function(response) {
                $('#result').html('<img id="saved-signature" src="' + dataURL + '" alt="Saved Signature" />');
                $('#action-buttons').show();
            }
        });
    }


    function download() {
        const image = document.getElementById('saved-signature');
        if (image) {
            const link = document.createElement('a');
            link.href = image.src;
            link.download = 'signature.png';
            link.click();
        }
    }

    function deleteSignature() {
        $('#saved-signature').remove();
        $('#action-buttons').hide();
    }