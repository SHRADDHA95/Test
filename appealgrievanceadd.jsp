<%@ page import="java.util.*"%>
<%@ page errorPage="/psafe/jsp/errorpage.jsp"%>
<%@ taglib uri="http://www.caremark.com/clt/psafe" prefix="caremark.csv"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page
	import="com.caremark.psd.peoplesafe.csv.components.appealgrievance.AppealGrievanceFacade"%>

<jsp:useBean id="aTCFAppFacade"
	class="com.caremark.psd.peoplesafe.csv.components.appealgrievance.AppealGrievanceFacade" />

<link rel="stylesheet" href="/psafe/css/peoplesafe.css" />
<script SRC="/psafe/csv/appealgrievance/javascripts/appealgrievance.js"></script>

<%@ page import="com.caremark.psd.peoplesafe.util.encode.Reform;"%>
<%!AppealGrievanceFacade facade = new AppealGrievanceFacade();%>
<%
	AppealGrievanceFacade fa = (AppealGrievanceFacade) request
			.getAttribute("facade");
	String priorAuthorizationID = (fa.getPriorAuthorizationID() == null || fa
			.getPriorAuthorizationID().equals("null")) ? "" : fa
			.getPriorAuthorizationID();
	String priorAuthorizationEffectivedate = (fa
			.getPriorAuthorizationEffectivedate() == null || fa
			.getPriorAuthorizationEffectivedate().equals("null")) ? ""
			: fa.getPriorAuthorizationEffectivedate();
	String priorAuthorizationExpirationdate = (fa
			.getPriorAuthorizationExpirationdate() == null || fa
			.getPriorAuthorizationExpirationdate().equals("null")) ? ""
			: fa.getPriorAuthorizationExpirationdate();
%>

<%-- <%
	String claimSequence = (String) session
			.getAttribute("claimSequence");
	String filledDate = (String) session.getAttribute("filledDate");
	
%> --%>

<%-- <p><%=fa.getPriorAuthorizationID() %> </p>
<p><%=fa.getPriorAuthorizationEffectivedate() %> </p>
<p><%=fa.getPriorAuthorizationExpirationdate() %> </p> --%>
<%-- <input type="hidden" name="appealgrievancecomponent"
	value="<%=aTCFAppFacade.getComponentId()%>">

<input type="hidden" name="priorAuthorizationID"
	value="<%=priorAuthorizationID%>">
<input type="hidden" name="priorAuthorizationEffectivedate"
	value="<%=priorAuthorizationEffectivedate%>">
<input type="hidden" name="priorAuthorizationExpirationdate"
	value="<%=priorAuthorizationExpirationdate%>"> --%>

<br>
<fieldset>
	<legend class="labelhead_1">G&A:</legend>
	<TABLE width="100%" border=0>
		<tbody>
			<TR vAlign=top>
				<TD width="10%" class="labels">Type:</TD>
				<TD class='results'><SELECT style="width: 56%;"
					id="typedropdown" name="typedropdown"
					onchange="javascript:typeChanged();">
						<c:forEach items="${aTCFAppFacade.getTypeCodes()}"
							var="typeOptionValue">
							<Option value="<c:out value="${typeOptionValue}"/>">
								<c:out value="${typeOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>
				<TD width="10%" class="labels">Relationship:</TD>
				<TD width="23%" class='results'><SELECT style="width: 30%;"
					id="relationshipdropdown" name="relationshipdropdown">
						<c:forEach items="${aTCFAppFacade.getRelationshipCodes()}"
							var="relOptionValue">
							<Option value="<c:out value="${relOptionValue}"/>">
								<c:out value="${relOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>

				<TD width="10%" class="labels">Priority:</TD>
				<TD class='results'><SELECT style="width: 30%;"
					id="prioritydropdown" name="prioritydropdown">
						<c:forEach items="${aTCFAppFacade.getPriorityCodes()}"
							var="priorityOptionValue">
							<Option value="<c:out value="${priorityOptionValue}"/>">
								<c:out value="${priorityOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>
			</TR>
			<TR>
				<TD>
					<div id="typeMessage" style="color: red; font-size: 12px;"></div></TD>
			</TR>
			<TR vAlign=top>
				<TD class="labels">Requestor Name:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="requestorName" id="requestorName" value='' /></TD>


				<TD width="23%" class="labels"></TD>
				<TD width="23%" class='results'></TD>

				<TD class="labels">Received Method:</TD>
				<TD width="23%" class='results'><SELECT style="width: 30%;"
					id="recMethoddropdown" name="recMethoddropdown">
						<c:forEach items="${aTCFAppFacade.getReceivedMethodCodes()}"
							var="recMethodOptionValue">
							<Option value="<c:out value="${recMethodOptionValue}"/>">
								<c:out value="${recMethodOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>
			</TR>
			<TR>
				<TD><div id="error_requesterName"
						style="color: red; font-size: 12px;"></div></TD>
				<TD><div id="error_revMeth"
						style="color: red; font-size: 12px;"></div></TD>
			</TR>
			<TR vAlign=top>
				<TD class="labels">Address 1:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="addressOneGA" id="addressOneGA" value='' /></TD>

				<TD class="labels">Address 2:</TD>
				<TD class='results'><input style="width: 30%;" type="text"
					name="addressTwoGA" id="addressTwoGA" value='' /></TD>
			</TR>

			<TR vAlign=top>
				<TD class="labels">City:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="cityGA" id="cityGA" value='' /></TD>

				<TD class="labels">State:</TD>
				<TD class='results'><input style="width: 23%;" type="text"
					name="stateGA" id="stateGA" value='' />
				</TD>

				<TD class="labels">Zip:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="zipGA" id="zipGA" value='' maxlength="5"
					onkeypress="return isNumber(event);" /></TD>
			</TR>



			<TR vAlign=top>
				<TD class="labels">Phone:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="phoneGA" id="phoneGA" value=''
					onkeypress="return isNumber(event);" /></TD>

				<TD class="labels">Fax:</TD>
				<TD width="23%" class='results'><input style="width: 30%;"
					type="text" name="faxTwoGA" id="faxTwoGA" value=''
					onkeypress="return isNumber(event);" /></TD>


			</TR>

			<TD><div id="error_phoneGA" style="color: red; font-size: 12px;"></div>
			</TD>

			<TR vAlign=top>
				<TD class="labels">Email:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="emailGA" id="emailGA" value='' />
				</TD>

				<TD class="labels">Communication <br> Preference:</TD>
				<TD class='results' width="56%"><SELECT id="comPrefdropdown"
					name="comPrefdropdown">
						<c:forEach
							items="${aTCFAppFacade.getCommunicationPreferenceCodes()}"
							var="comPrefOptionValue">
							<Option value="<c:out value="${comPrefOptionValue}"/>">
								<c:out value="${comPrefOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>
			<tr>
				<TD><div id="error_emailGA"
						style="color: red; font-size: 12px;"></div></TD>
				<TD></TD>
				<TD></TD>
				<TD><div id="error_MailGA" style="color: red; font-size: 12px;"></div>
				</TD>
			<tr>

			</TR>
		</tbody>
	</TABLE>
</fieldset>
<br>
<br>
<fieldset id="grievancefieldSet">
	<legend class="labelhead_1">Grievance:</legend>
	<TABLE width="100%" border=0>
		<tbody>
			<br>
			<TR vAlign=top>
				<TD width="10%" class="labels">Grievance Start Date :</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="grievanceStartDate" id="grievanceStartDate"
					value='' /></TD>

				<TD width="10%" class="labels">Grievance End Date:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="grievanceStartEnd" id="grievanceStartEnd"
					value='' />
				</TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>
			<TR>
				<TD><div id="error_date" style="color: red; font-size: 12px;"></div>
				</TD>
				<TD></TD>
				<TD></TD>
				<TD><div id="error_date_ends"
						style="color: red; font-size: 12px;"></div></TD>
			</TR>
			<TR vAlign=top>
				<TD class="labels">Grievance About:</TD>
				<TD class='results'><SELECT style="width: 56%;"
					id="grievanceAboutdropdown" name="grievanceAboutCodedropdown">
						<c:forEach items="${aTCFAppFacade.getGrievanceAboutCodes()}"
							var="grievanceAboutOptionValue">
							<Option value="<c:out value="${grievanceAboutOptionValue}"/>">
								<c:out value="${grievanceAboutOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT>
				</TD>

				<TD class="labels">Grievance Against:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="grienanceAgainst" id="grienanceAgainst" value='' /></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>
			<TR>
				<TD><div id="error_griAbout"
						style="color: red; font-size: 12px;"></div></TD>
				<TD></TD>
				<TD></TD>
				<TD><div id="error_griAgainst"
						style="color: red; font-size: 12px;"></div></TD>
			</TR>

			<TR vAlign=top>
				<TD class="labels">Address 1:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="addressOne" id="addressOne" value='' /></TD>

				<TD class="labels">Address 2:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="AddressTwo" id="AddressTwo" value='' /></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>

			<TR vAlign=top>
				<TD class="labels">City:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="city" id="grievanceCity" value='' /></TD>

				<TD class="labels">State:</TD>
				<TD width="16%" class='results'><input style="width: 56%;"
					type="text" name="grievancestate" id="grievancestate" value='' />
				</TD>

				<TD width="10%" class="labels">Zip:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="zip" id="grievanceZip" value='' maxlength="5"
					onkeypress="return isNumber(event);" /></TD>
			</TR>

			<TR vAlign=top>
				<TD class="labels">Phone:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="phone" id="grievancePhone" value=''
					onkeypress="return isNumber(event);" /></TD>

				<TD class="labels">Fax:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="fax" id="grievanceFax" value='' /></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>

			<TD><div id="error_griPhone"
					style="color: red; font-size: 12px;"></div></TD>

			<TR vAlign=top>
				<TD class="labels">Email:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="email" id="grievanceEmail" value='' /></TD>

				<TD class="labels">Communication Preference:</TD>
				<TD class='results'><SELECT style="width: 56%;"
					id="grievanceComPrefdropdown" name="grievanceComPrefdropdown">
						<c:forEach
							items="${aTCFAppFacade.getCommunicationPreferenceCodes()}"
							var="communicationPrefOptionValue">
							<Option value="<c:out value="${communicationPrefOptionValue}"/>">
								<c:out value="${communicationPrefOptionValue}" />
							</OPTION>
						</c:forEach>
				</SELECT></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>
			<TD><div id="error_griEmail"
					style="color: red; font-size: 12px;"></div></TD>
			<TD></TD>
			<TD><div id="error_griMail" style="color: red; font-size: 12px;"></div>
			</TD>

			<TR vAlign=top>
				<TD width="10%" class="labels">Claim/Seq:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="claimSeqGrievance" id="claimSeqGrievance"
					value='' />
				</TD>
				<TD width="10%" class="labels">Fill Date:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="fillDateGrievance" id="fillDateGrievance" value='' />
				</TD>
				<TD class="labels">Prescriber NPI:</TD>
				<TD class='results'><input style="width: 56%;" type="text"
					name="prescNPI" id="prescriberNPI" value='' /></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>

				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>
		</tbody>
	</TABLE>
</fieldset>
<br>
<br>
<fieldset id="appealfieldset">
	<legend class="labelhead_1">Appeal:</legend>
	<TABLE width="100%" border=0>
		<tbody>
			<TR vAlign=top>
				<TD width="10%" class="labels">Claim/Seq:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="claimSeq" id="claimSeq" value='' />
				</TD>

				<TD width="10%" class="labels">Fill Date:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="fillDate" id="fillDate" value='' />
				</TD>
				<TD class="labels"></TD>
				<TD class='results'></TD>
			</TR>
		</tbody>
	</TABLE>
	<br> <br>
	<TABLE width="100%" border=0>
		<tbody>
			<TR vAlign=top>
				<TD width="10%" class="labels">Prior Auth:</TD>
				<TD width="22%" class='results'><input style="width: 56%;"
					type="text" name="priorAuth" id="priorAuth" value='' />
				</TD>

				<TD width="10%" class="labels">Effective Date:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="effectiveDate" id="effectiveDate" value='' /></TD>

				<TD width="10%" class="labels">Expiration Date:</TD>
				<TD width="23%" class='results'><input style="width: 56%;"
					type="text" name="expirationDate" id="expirationDate" value='' />
				</TD>
			</TR>
		</tbody>
	</TABLE>
</fieldset>
<br>

<fieldset>
	<legend class="labelhead_1">Comments:</legend>
	<TABLE width="80%" border=0>
		<tbody>
			<TR vAlign=top>
				<TD width="13%" class="labels">comments:</TD>
				<TD class='results'><textarea cols="50" rows="2" id="comments"
						style="overflow-y: scroll; resize: none;"></textarea></TD>
			</TR>
			<TR>
				<TD>
				<TD><div id="error_comment"
						style="color: red; font-size: 12px;" /></div>
				</TD>
			</TR>

			<TR>
				<TD width="13%" class="labels">Expected <br>Outcome:</TD>
				<TD class='results'><textarea cols="50" rows="2"
						id="exp_output" style="overflow-y: scroll; resize: none;"></textarea>
				</TD>
			</TR>
			<TR>
				<TD><div id="error_exp_output"
						style="color: red; font-size: 12px;"></div></TD>
			</TR>
		</tbody>
	</TABLE>
</fieldset>
<br>
<TABLE width="100%" border=0>
	<tbody>
		<TR>
			<TD>
				<button type="submit" name="addGA" onclick="return submitAddG_A()"
					style="width: 125px">Submit</button></TD>
			<TD width="70%"></TD>
			<TD>
				<button name="addGA" onclick='clearAddG_A()' style="width: 125px">Clear</button>
			</TD>
			<TD>
				<button name="addGA" onclick='backAddG_A()' style="width: 125px">Back</button>
			</TD>

		</TR>
	</tbody>
</TABLE>
<br>
<hr>
<br>


