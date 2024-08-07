var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var leap = 2024;
var leapdays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

window.addEventListener('load', function(){
	$('#edit-dates').on('click', function(){
		$(this).toggleClass('active');
	});

	/*$(window).on('scroll', function(){
		if ( $('#edit-dates').hasClass('active') ) {
			$('#edit-dates').trigger('click');
		}
	});*/

	$('#layout3x4').on('click', function(){
		$('#cal > .row:first-child').removeClass('row-cols-6');
		$('#cal > .row:first-child').removeClass('row-cols-4');
		$('#cal > .row:first-child').removeClass('row-cols-2');
		$('#cal > .row:first-child').addClass('row-cols-3');
	});

	$('#layout4x3').on('click', function(){
		$('#cal > .row:first-child').removeClass('row-cols-6');
		$('#cal > .row:first-child').removeClass('row-cols-3');
		$('#cal > .row:first-child').removeClass('row-cols-2');
		$('#cal > .row:first-child').addClass('row-cols-4');
	});

	$('#layout2x6').on('click', function(){
		$('#cal > .row:first-child').removeClass('row-cols-6');
		$('#cal > .row:first-child').removeClass('row-cols-3');
		$('#cal > .row:first-child').removeClass('row-cols-4');
		$('#cal > .row:first-child').addClass('row-cols-2');
	});

	$('#layout6x2').on('click', function(){
		$('#cal > .row:first-child').removeClass('row-cols-2');
		$('#cal > .row:first-child').removeClass('row-cols-3');
		$('#cal > .row:first-child').removeClass('row-cols-4');
		$('#cal > .row:first-child').addClass('row-cols-6');
	});

	$('#portrait').on('click', function(){
		$('#cal').css({
			'width': '720px',
			'height': '960px'
		});
	});

	$('#landscape').on('click', function(){
		$('#cal').css({
			'width': '960px',
			'height': '720px'
		});
	});

	function init() {
		const today = new Date();
		$(`#month option[value="${today.getMonth()}"]`).attr('selected', '');
		$(`#year option[value="${today.getFullYear()}"]`).attr('selected', '');
		return true;
	}

	function fillDates() {
		resetTds();
		const d = new Date($('#year').val(), $('#month').val(), 1);

		let count = d.getMonth();
		let curryear = d.getFullYear()
		$('.calendar table').each(function(index){
			$(this).attr('month', count);
			$(this).find('thead tr th[colspan="7"]').each(function(){
				$(this).html(`${months[count]} ${curryear}`)
			});
			count += 1;
			if ( count >= months.length ) {
				count = 0;
				curryear += 1;
			}
		});

		let yearcount = d.getFullYear();
		let monthcount = d.getMonth();
		let daycount = 1;
		let prev = d.getDay() - 1;
		$('td').each(function( index ){
			if ( $(this).parents('table').attr('month') == monthcount ) {
				if ( prev + 1 == 7 ) {
					prev = -1;
				}
				if ( daycount == 1 && index % 7 != prev + 1 ) {
					$(this).addClass('table-secondary');
				} else {
					$(this).html(`${daycount}`);
					daycount += 1;
					if ( yearcount != leap && daycount > days[monthcount] ) {
						daycount = 1;
						monthcount += 1;
						if ( monthcount > 11 ) {
							monthcount = 0;
							yearcount += 1;

						}
					} else if ( yearcount == leap && daycount > leapdays[monthcount] ) {
							daycount = 1;
							monthcount += 1;
							if ( monthcount > 11 ) {
								monthcount = 0;
								yearcount += 1;

							}
						}
					prev = index % 7;
				}
			} else {
				$(this).html('&nbsp;');
				$(this).addClass('table-secondary');
			}
		});
	}

	function resetTds() {
		$('td').each(function(){
			$(this).removeClass('table-secondary');
			$(this).html('');
		});
	}

	if ( init() ) {
		fillDates();
	}
	$('#do').on('click', fillDates);

});

/*

7.5 inches = 720 px

8.5 inches = 816 px

10 inches = 960 px

11 inches = 1056 px

*/