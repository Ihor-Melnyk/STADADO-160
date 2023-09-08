///// Технічний договір
//заполнение данными из 1С дополнительных атрибутов контрагента, которые не вхоят в состав стандартных атрибутов еДокс. Происходит по событию изменения в контроле "контрагент"
//region updatea data from 1C
function onChangecontractorId(onButtonPush = false) {
  // debugger
  clearCounterparty();
  var conInfo;
  var atr = EdocsApi.getAttributeValue("contractorId");
  if (atr && atr.text) {
    var contrArr = atr.text.split("|");
    if (contrArr.length === 1) {
      conInfo = EdocsApi.getContractorData(contractorId.text);
    } else if (contrArr.length === 2) {
      var edocsGETCONTRACTOR = EdocsApi.runExternalFunction("1C", "edocsGETCONTRACTOR?format=json&CONTRACTORID=" + contrArr[0] + "&CONTRACTORTYPE=" + contrArr[1] + "&MAXRESULTCOUNT=200", null, "get");
      if (edocsGETCONTRACTOR == null || edocsGETCONTRACTOR.data == null) {
        return;
      }
      conInfo = edocsGETCONTRACTOR.data;
    }
    setUpdateWith1C(conInfo);
    if (onButtonPush) setUpdateWith1CSystemAttr(conInfo);
  }
}

function isCheckValue(value) {
  if (value == "CounterpartyNotResident" || value == "CounterpartyKindCustomer" || value == "CounterpartyKindProvider" || value == "CounterpartyCheck" || value == "CheckNeed" || value == "CorporateIncludes") {
    return true;
  }
  return false;
}

function setUpdateWith1C(data) {
  //debugger;
  var val = data.attributes;
  if (val && val.length) {
    //  try {
    EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: val.find(x => x.code == "CounterpartyTaxNumber")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: val.find(x => x.code == "CounterpartyNotResident")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: val.find(x => x.code == "CounterpartyKindCustomer")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: val.find(x => x.code == "CounterpartyKindProvider")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: val.find(x => x.code == "CounterpartyFeature")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: val.find(x => x.code == "CounterpartyRegion")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: val.find(x => x.code == "CorporateIncludes")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: val.find(x => x.code == "CounterpartyAddress")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartySite", value: val.find(x => x.code == "CounterpartySite")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: val.find(x => x.code == "CounterpartyCheck")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: val.find(x => x.code == "CounterpartyStatus")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: val.find(x => x.code == "AuditDateUntil")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: val.find(x => x.code == "AdditionalConditions")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: val.find(x => x.code == "CounterpartyNumberAgreement")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: val.find(x => x.code == "CounterpartyYearLimit")?.value, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: val.find(x => x.code == "CounterpartAmount")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyYearAmount", value: val.find(x => x.code == "CounterpartyYearAmount")?.value, text: null });
  }
  if (data.accounts && data.accounts.length) {
    //debugger;
    setAccounsMap(data.accounts);
  }
  if (data.authorisedPersons && data.authorisedPersons.length) {
    //debugger;
    setAuthPersonsMap(data.authorisedPersons);
  }
  // } catch (e) {
  //    console.log(e)
  //   throw 'невірні дані'
  // }
}

function clearCounterparty() {
  //debugger;   add cleaner for block with archiving data
  EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AccountChange", value: null, text: null }); //не простовлять
  EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartySite", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearAmount", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Rate", value: null, text: null });
}

//endregion
//region set Currency and CounterpartyAccountKind
var mapAccounts = null;

function setAccounsMap(array) {
  // debugger;
  var dataCurrencyAccKind = EdocsApi.getAttributeValue("DataCurrencyAccKind");
  if (array?.length) {
    mapAccounts = new Map();
    array.forEach(x => mapAccounts.set(x.CounterpartyAccount, [x.CounterpartyCurrency, x.CounterpartyAccountKind]));
    dataCurrencyAccKind.value = JSON.stringify(Object.fromEntries(mapAccounts));
    safeChangAttr(dataCurrencyAccKind);
  } else {
    if (dataCurrencyAccKind?.value) {
      Object.entries(JSON.parse(array.value)).forEach(x => {
        mapAccounts.set(x[0], x[1]);
      });
    }
  }
}

function setCurrenAccoundKind(account) {
  // debugger
  var counterpartyCurrency = EdocsApi.getAttributeValue("CounterpartyCurrency");
  var counterpartyAccountKind = EdocsApi.getAttributeValue("CounterpartyAccountKind");
  if (account) {
    if (!mapAccounts?.size) {
      setAccounsMap();
    }
    if (mapAccounts?.has(account)) {
      var item1 = EdocsApi.getDictionaryData("Currencies");
      var item = item1.find(x => x.value === mapAccounts.get(account)[0]);
      if (item) {
        counterpartyCurrency = { code: "CounterpartyCurrency", value: item.id, text: item.value, itemCode: item.code, itemDictionary: "Currencies" };
      }
      counterpartyAccountKind.value = mapAccounts.get(account)[1];
    } else {
      EdocsApi.message(`дані по ${account} відсутні в accounts`);
    }
  } else {
    //counterpartyCurrency.value ={code: 'CounterpartyCurrency', value: null, text: null, itemCode: null, itemDictionary: 'Currencies'};
    counterpartyCurrency.value = null;
    counterpartyCurrency.text = null;
    counterpartyAccountKind.value = null;
  }
  safeChangAttr(counterpartyCurrency);
  safeChangAttr(counterpartyAccountKind);
}

function onChangeCounterpartyAccount() {
  // debugger
  setCurrenAccoundKind(EdocsApi.getAttributeValue("CounterpartyAccount").value);
}

//endregion
//region set CounterpartyAuthPersPhone and CounterpartyAuthPersEmail
var mapAuthPersons = null;

function setAuthPersonsMap(array) {
  // debugger;
  var dataAuthPersonMap = EdocsApi.getAttributeValue("DataAuthPersonMap");
  if (array?.length) {
    mapAuthPersons = new Map();
    array.forEach(x => mapAuthPersons.set(x.FullName, [x.CounterpartyAuthPersEmail, x.CounterpartyAuthPersPhone]));
    dataAuthPersonMap.value = JSON.stringify(Object.fromEntries(mapAuthPersons));
    safeChangAttr(dataAuthPersonMap);
  } else {
    if (dataAuthPersonMap?.value) {
      Object.entries(JSON.parse(array.value)).forEach(x => {
        mapAuthPersons.set(x[0], x[1]);
      });
    }
  }
}

function setAuthorizedPersonPhoneEmail(person) {
  // debugger;
  var counterpartyAuthPersPhone = EdocsApi.getAttributeValue("CounterpartyAuthPersPhone");
  var counterpartyAuthPersEmail = EdocsApi.getAttributeValue("CounterpartyAuthPersEmail");
  if (person) {
    if (mapAuthPersons?.has(person)) {
      counterpartyAuthPersEmail.value = mapAuthPersons.get(person)[0];
      counterpartyAuthPersPhone.value = mapAuthPersons.get(person)[1];
    } else {
      EdocsApi.message(`помилка по ${person} CounterpartyAuthorizedPerson1`);
    }
  } else {
    counterpartyAuthPersEmail.value = null;
    counterpartyAuthPersPhone.value = null;
  }
  safeChangAttr(counterpartyAuthPersEmail);
  safeChangAttr(counterpartyAuthPersPhone);
}

function onChangeCounterpartyAuthorizedPerson1() {
  setAuthorizedPersonPhoneEmail(EdocsApi.getAttributeValue("CounterpartyAuthorizedPerson1").value);
}

//endregion
//

function clearContractExtensioInfo() {
  if (EdocsApi.getAttributeValue("FlagProlongClear")?.value == "true") {
    var table = EdocsApi.getAttributeValue("ContractExtensioInfo");
    if (table && table.value.length > 0) {
      table.value = null;
      EdocsApi.setAttributeValue(table);
    }
    var table2 = EdocsApi.getAttributeValue("GeneralStorageTerm");
    if (table2 && table2.value.length > 0) {
      table2.value = null;
      EdocsApi.setAttributeValue(table2);
    }
    EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: false });
  }
}

function onCreate() {
  debugger;
  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "OrgEDRPOU", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "OrgName", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "contractorId", value: null, text: null });
  //setContractStatus();// переделать

  //if (CurrentDocument.isDraft) {

  EdocsApi.setAttributeValue({ code: "Responsible", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ResponsibleDepartment1", value: null, text: null });

  EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: true });

  /*setTimeout(() => {
    //EdocsApi.setAttributeValue({code: 'ContractExtensioInfo', value: null});
    }, 1000);*/

  EdocsApi.setAttributeValue({ code: "ResponsibleDirector", value: null, text: null });
  //EdocsApi.setAttributeValue({code: 'ContractExtensioInfo', value: null, text: null});
  /*EdocsApi.setAttributeValue({code: 'ContractExtensioDate', value: null, text: null});
    EdocsApi.setAttributeValue({code: 'ContractExtensioDoc', value: null, text: null});
    EdocsApi.setAttributeValue({code: 'ContractExtensio', value: null, text: null});*/
  EdocsApi.setControlProperties({ code: "ContarctEndDate", hidden: false, disabled: true, required: false });

  EdocsApi.setAttributeValue({ code: "AccountChange", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Approvals", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "NameForSubject", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ApprovalNext", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Review", value: null, text: null });
  //clearTables();
  EdocsApi.setAttributeValue({ code: "ContractAmount", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ContractAmountComment", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "PlanAmountGeneral", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "DocumentCharacter", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "HighRiskCategory", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "SignatureFormat", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "BudgetPlanned", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "BudgetComment", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "UsedTemplate", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "RateCurrencyPlanComent", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "DocumentSubject", value: null, text: null }); //
  EdocsApi.setAttributeValue({ code: "Rate", value: null, text: null }); //
  /*
    EdocsApi.setAttributeValue({code: 'Responsible', value: null, text: null});
    EdocsApi.setAttributeValue({code: 'ResponsibleDepartment1', value: null, text: null});
    EdocsApi.setAttributeValue({code: 'ResponsibleDirector', value: null, text: null});
    EdocsApi.setAttributeValue({code: 'ContractExtensioInfo', value: null});
    EdocsApi.setControlProperties({code: 'ContarctEndDate', hidden: false, disabled: true, required: false});
    */
  // }
}

function clearTables() {
  var planAmountTitle = EdocsApi.getAttributeValue("PlanAmountTitle");
  if (planAmountTitle && planAmountTitle.value && planAmountTitle.value.length) {
    var arr = planAmountTitle.value.map(t =>
      t.map(x => {
        if (x.code == "PlanAmountStartDate" || x.code == "PlanAmountEndDate" || x.code == "PlanAmount") {
          x.value = null;
        }
      })
    );
  }
  planAmountTitle.value = arr;
  EdocsApi.setAttributeValue(planAmountTitle);
  EdocsApi.setAttributeValue({ code: "PaymentConditions", type: "table", value: null });
}

function safeChangAttr(attr) {
  if (CurrentDocument.isDraft) {
    EdocsApi.setAttributeValue(attr);
  }
}

function onTaskExecuteSendOutDocESIGN() {
  //function onButtonPushButton() {

  var RegDate1 = EdocsApi.getAttributeValue("RegDate1").value;
  if (!RegDate1) throw 'Заповніть, будь ласка, обов\'язкове поле "Дата  рахунка"';
  var sendCreatedDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(),
    documentUrl: CurrentDocument.url,
    docType: EdocsApi.getAttributeValue("DocKindeDocsNew").value,
  };

  var RegDate1 = EdocsApi.getAttributeValue("RegDate1"); //{code: "RegDate1", value: addHours(new Date(RegDate1), 2).toISOString()};
  var organizationId = EdocsApi.getAttributeValue("Organizationid");
  var organization = { code: "Organization", value: organizationId.value };
  var counterpartyId = EdocsApi.getAttributeValue("contractorId");
  var counterparty = { code: "Counterparty", value: null };
  if (counterpartyId.value) {
    counterparty.value = counterpartyId.value.split("|")[0];
  }
  var accounts = [];
  var account = EdocsApi.getAttributeValue("CounterpartyAccount").value;
  var bank = EdocsApi.getAttributeValue("CounterpartyBank").value;
  if (account && bank) {
    accounts.push({ Number: account, Bank: bank });
  }
  sendCreatedDoc.attributes = [
    EdocsApi.getAttributeValue("ContractAmount"),
    //EdocsApi.getAttributeValue('OrdNumber'),
    //EdocsApi.getAttributeValue('RegNumberCounterparty'),//
    EdocsApi.getAttributeValue("RateCurrency"), //95
    //EdocsApi.getAttributeValue('EnteringDate'),
    EdocsApi.getAttributeValue("RegNumber"),
    EdocsApi.getAttributeValue("DocumentKind"),
    { code: "DocumentType", text: "Технічний договір ( сплата за рахунком)" },
    //EdocsApi.getAttributeValue('AdditionalAgreementCheck'),
    //EdocsApi.getAttributeValue('AdditionalAgreementText'),
    EdocsApi.getAttributeValue("ContractAmount"),
    EdocsApi.getAttributeValue("RateCurrency"), //
    EdocsApi.getAttributeValue("BudgetPlanned"), //
    EdocsApi.getAttributeValue("BudgetComment"),
    //EdocsApi.getAttributeValue('PlanAmountGeneral'),
    //EdocsApi.getAttributeValue('RateCurrencyPlan'),//
    //EdocsApi.getAttributeValue('RateCurrencyPlanComent'),//
    EdocsApi.getAttributeValue("ResponsibleDirector"),
    EdocsApi.getAttributeValue("ManagerDepartment"),
    EdocsApi.getAttributeValue("Responsible"),
    EdocsApi.getAttributeValue("Manager"),
    EdocsApi.getAttributeValue("ContarctEndDate"),
    //EdocsApi.getAttributeValue('LetterProlongation'),
    // EdocsApi.getAttributeValue('ProlongationComent'),
    organization,
    counterparty,
    //EdocsApi.getAttributeValue('ProcurementInfo'), //err
    //EdocsApi.getAttributeValue('ProcurementInfoTable'),
    //EdocsApi.getAttributeValue('ProcurementDate'),
    // EdocsApi.getAttributeValue('ProcurementAmount'),
    //EdocsApi.getAttributeValue('Settlements'),
    //EdocsApi.getAttributeValue('BuNu'),
    // EdocsApi.getAttributeValue('SettlementsCurrency'),
    // EdocsApi.getAttributeValue('PostPayment'),
    // EdocsApi.getAttributeValue('BankDays'),
    // EdocsApi.getAttributeValue('RegDate1'),
    RegDate1,
    EdocsApi.getAttributeValue("NameForSubject"),
    /*EdocsApi.getAttributeValue('PaymentConditionsComment'),
        EdocsApi.getAttributeValue('PlanAmountTitle'),
        EdocsApi.getAttributeValue('DocKindContact1С'),
        EdocsApi.getAttributeValue('ProjectName'),*/
    { code: "accounts", value: accounts },
    { code: "ResponsibleDepartmentId", value: EdocsApi.getAttributeValue("ManagerDepartment").value },
    { code: "ResponsibleDepartment1", value: EdocsApi.getAttributeValue("ResponsibleDepartment1").text },
    EdocsApi.getAttributeValue("ResponsibleDirector"),
    { code: "DocumentKindeDocs", value: EdocsApi.getAttributeValue("DocumentKindeDocs").text },
  ];
  //table
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PaymentConditions"));
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
  //sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue('ContractExtensioInfo'));
  var successMessage = "Документ успішно створено в 1С. Ідентифікатор документа ";
  var response = EdocsApi.runExternalFunction("1C", "edocsCreateDoc", sendCreatedDoc);
  if (response.data) {
    if (response.data.extDocId) {
      if (response.data.warnings && response.data.warnings.length > 0) {
        var warningsMessage = "";
        for (var i = 0; i < response.data.warnings.length; i++) {
          warningsMessage += response.data.warnings[i].message + "; ";
        }
        EdocsApi.message(warningsMessage);
      } else {
        EdocsApi.message(successMessage + response.data.extDocId);
        var ExtDocID = EdocsApi.getAttributeValue("extDocId");
        ExtDocID.value = response.data.extDocId;
        EdocsApi.setAttributeValue(ExtDocID);
      }
    }
    if (response.data.error) {
      if (response.data.error.validationErrors && response.data.error.validationErrors.length > 0) {
        var errorMessage = "";
        for (var j = 0; j < response.data.error.validationErrors.length; j++) {
          errorMessage += response.data.error.validationErrors[j].message + "; ";
        }
        throw response.data.error.details + "  -  " + errorMessage;
      }
    }
  } else if (response.error) {
    throw response.error;
  } else {
    throw "Зовнішня система не повернула результ при створенні документу";
  }
}

function onChangeManager() {
  // debugger
  var initiator = EdocsApi.getAttributeValue("Manager");
  var departmentInitiator = EdocsApi.getAttributeValue("ResponsibleDepartmentHead");
  //debugger;
  if (initiator && initiator.value) {
    var manager = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value);
    if (manager && manager.unitLevel != 1) {
      if (manager.managerId == initiator.value && manager.unitLevel != 2) {
        var item = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value, manager.unitLevel - 1)?.managerId;
        if (item) {
          departmentInitiator.value = item;
          departmentInitiator.text = getName(item);
        } else {
          departmentInitiator.value = initiator.value;
          departmentInitiator.text = getName(initiator.value);
        }
      } else {
        departmentInitiator.value = manager.managerId;
        departmentInitiator.text = getName(manager.managerId);
      }
    } else {
      departmentInitiator.value = initiator.value;
      departmentInitiator.text = initiator.text;
    }
  } else {
    departmentInitiator.value = null;
    departmentInitiator.text = null;
  }
  safeChangAttr(departmentInitiator);
}

function onCardInitialize() {
  onChangeManager();
  onChangeResponsible();
  setStoragePeriod();
  if (!EdocsApi.getAttributeValue("ContarctEndDate")?.value) onChangeRegDate1();
  //clearContractExtensioInfo();
}

// отражение руководителя подразделения Инициатора
function onChangeResponsible() {
  var responsibleDirector = EdocsApi.getAttributeValue("ResponsibleDirector");
  var responsible = EdocsApi.getAttributeValue("Responsible");
  //debugger;
  if (responsible.value) {
    var manager = EdocsApi.getEmployeeManagerByEmployeeID(responsible.value);
    if (manager && manager.unitLevel > 1) {
      if (manager.unitLevel > 2) {
        var item = EdocsApi.getEmployeeManagerByEmployeeID(responsible.value, 2)?.managerId;
        if (item) {
          responsibleDirector.value = item;
        } else {
          responsibleDirector.value = responsible.value;
        }
      } else {
        responsibleDirector.value = manager.managerId;
      }
    } else {
      responsibleDirector.text = responsible.text;
      responsibleDirector.value = responsible.value;
    }
    safeChangAttr(responsibleDirector);
  } else {
    clearData(responsibleDirector);
    safeChangAttr(responsibleDirector);
    safeChangAttr({ code: "ResponsibleDepartment1", value: null, text: null });
  }
}

function getName(id) {
  if (id) {
    //return EdocsApi.getEmployeeDataByEmployeeID(id).surnameNM;
    return EdocsApi.getEmployeeDataByEmployeeID(id).fullName;
  }
}

function setStoragePeriod() {
  //storageTerm && storageTerm.value === null &&
  debugger;
  var generalStorageTerm = EdocsApi.getAttributeValue("GeneralStorageTerm");
  if (!generalStorageTerm.value.length) {
    var currDocName = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0].id;
    var array = EdocsApi.getDictionaryItemData("Term", id);
    var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);
    generalStorageTerm.value = [[{ code: "StorageTerm", value: new Date(new Date().getFullYear() + 1 + years, 0, 1).toISOString() }]];
  } else {
    generalStorageTerm.value[0]?.forEach(x => {
      if (x.code == "StorageTerm") x.value = null;
    });
  }
  EdocsApi.setAttributeValue(generalStorageTerm);
}

function onChangeRegNumber() {
  setNameForSubject();
}
function setNameForSubject() {
  var date = EdocsApi.getAttributeValue("RegDate1").value;
  date ? (date = moment(date).format("DD.MM.YYYY")) : (date = "");
  var regNum = EdocsApi.getAttributeValue("RegNumber").value;
  EdocsApi.setAttributeValue({ code: "NameForSubject", value: EdocsApi.getAttributeValue("DocumentKindeDocs").text + " № " + (regNum ? regNum : "") + " від  " + date, text: null });
}

function clearData(attr) {
  //debugger
  attr.value = null;
  attr.text = null;
  safeChangAttr(attr);
}

//выбор ЕДРПОУ юр.особы, запись в скрытое поле "разрез" Accountant
function onChangeOrgEDRPOU() {
  // debugger;
  var orgEDRPOU = EdocsApi.getAttributeValue("OrgEDRPOU");
  if (orgEDRPOU.value) {
    EdocsApi.setAttributeValue({ code: "Accountant", value: orgEDRPOU.value });
  } else {
    EdocsApi.setAttributeValue({ code: "Accountant", value: null });
  }
}

function onChangeRegDate1() {
  setNameForSubject();
  var RegDate1 = EdocsApi.getAttributeValue("RegDate1");
  if (RegDate1 && RegDate1.value) {
    EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: new Date(new Date(RegDate1.value).addDays(45)).toISOString(), text: null });
  } else {
    EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: null, text: null });
  }
}
function onSearchCounterparty(request) {
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Creditor" });
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
function onRouteStart() {
  var CounterpartyStatus = EdocsApi.getAttributeValue("CounterpartyStatus");
  if (CounterpartyStatus && CounterpartyStatus.value == "Не підлягає") return;

  var currentDate = new Date(CurrentDocument.created).setHours(0, 0, 0, 0);
  var auditDateUntil = EdocsApi.getAttributeValue("AuditDateUntil").value;
  var auditDate = new Date(auditDateUntil).setHours(0, 0, 0, 0);
  if (currentDate > auditDate) {
    throw "По даному контрагенту прострочено дату НПК";
  }
}

function onBeforeCardSave() {
  if (CurrentDocument.isDraft) {
    setNameForSubject();
  }
}

function onButtonPushCounterpartyButton() {
  onChangecontractorId(true);
}

function setUpdateWith1CSystemAttr(data) {
  debugger;
  if (data) {
    //EdocsApi.setAttributeValue({ code: "Counterparty", value: `${data.ShortName} (${data.code})`, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAccount", value: data.accounts?.CounterpartyAccount || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: data.accounts?.CounterpartyCurrency || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: data.accounts?.CounterpartyBank || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: data.accounts?.CounterpartyMFO || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyName", value: data.attributes.find(x => x.code == "CounterpartyName")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyFullName", value: data.attributes.find(x => x.code == "CounterpartyFullName")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: data.attributes.find(x => x.code == "CounterpartyEDRPOU")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyINN", value: data.attributes.find(x => x.code == "CounterpartyINN")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyLegalAddress", value: data.attributes.find(x => x.code == "CounterpartyLegalAddress")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyPostalAddress", value: data.attributes.find(x => x.code == "CounterpartyPostalAddress")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyPhone", value: data.attributes.find(x => x.code == "CounterpartyPhone")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyEmail", value: data.attributes.find(x => x.code == "CounterpartyEmail")?.value || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthorizedPerson1", value: data.authorisedPersons[0]?.FullName || null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPosition", value: data.authorisedPersons[0]?.Position || null, text: null });
  }
}
