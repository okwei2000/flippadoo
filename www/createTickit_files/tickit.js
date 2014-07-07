function getTickitHistory(tickitId)
{
	jq(".dataRow").remove();
	var url = "/flippadoo/app/getTickitHistory";	
	jq.ajax({
		url : url,
		dataType : 'json',
		data : {
			tickitId : tickitId
		},
		type : 'get',
		async : false,
		success : function(tickitResponse) 
		{
			if(tickitResponse.status == 'OK')
			{
				for(var i = 0; i < tickitResponse.tickitHistoryModels.length; i++) 
				{
					var tickitHistoryModel = tickitResponse.tickitHistoryModels[i];
					
					var tableTr = '<tr class="dataRow">'
						+'<td>'+tickitHistoryModel.tickitHistoryId+'</td>'
						+'<td>'+tickitHistoryModel.tickitId+'</td>'
						+'<td>'+tickitHistoryModel.actionType+'</td>'
						+'<td>'+tickitHistoryModel.user.fullName+'</td>'
						+'<td>'+tickitHistoryModel.notes+'</td>'
						+'<td>'+tickitHistoryModel.strTime+'</td>'
						+'<td>'+tickitHistoryModel.ip+'</td>'
						+'<td>'+tickitHistoryModel.strGeolocation+'</td>'
						
						+'</tr>';
						jq('#historyTableId').append(tableTr);
								
				}
			}
			else
			{
				jq(".dataRow").remove();
				jq("#historyTableId").append('Sorry no Detils to display');	
			}
		},
		error : function(textStatus, errorThrown)
		{
			
			alert("inside error");
		}
	});	
}

function showHideInputBox()
{

	var selectedOption = $("#tickitType :selected").text();

	if(selectedOption == "Child")
	{
		$('#parentDiv').show();
	}
	else
	{
		$('#parentDiv').hide();
	}
}

function showHideChangeUserButton()
{

	var selectedOptionValue = $("#userDropDown").val();
	//var sessionUserEmail = $("#sessionUserEmail").val();
	$("#j_userName").val(selectedOptionValue);
	if(selectedOptionValue == 'All')
	{
		$('#changeUserButton').hide();
		$('#createTickit').hide();
		$("#j_userName").val("");
	}
	else
	{	
		$("#LoginForm").attr("action","authenticateUser");
		$("#LoginForm").submit();
		
		$('#createTickit').show();
		$('#changeUserButton').show();
	
	}
}

function showHideApiKeyBox()
{
	var selectedOption = $("#type").val();

	if(selectedOption == "USER")
	{
		$('#apiKeyDiv').show();
	}
	else
	{
		$('#apiKeyDiv').hide();
	}
}