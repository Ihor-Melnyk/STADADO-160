///// Лист пролонгація
//

//region updatea data from 1C
function onChangecontractorId(onButtonPush = false) {
  debugger;
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
    if (onButtonPush) {
      setUpdateWith1C(conInfo, onButtonPush);
    } else {
      setUpdateWith1C(conInfo);
    }
  }
}

function isCheckValue(value) {
  if (value == "CounterpartyNotResident" || value == "CounterpartyKindCustomer" || value == "CounterpartyKindProvider" || value == "CounterpartyCheck" || value == "CheckNeed" || value == "CorporateIncludes") {
    return true;
  }
  return false;
}

function setUpdateWith1C(data, onButtonPush) {
  //debugger;
  var val = data.attributes;
  if (val && val.length) {
    // try {
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
  if (!onButtonPush) {
    if (data.accounts && data.accounts.length) {
      setAccounsMap(data.accounts);
    }
    if (data.authorisedPersons && data.authorisedPersons.length) {
      setAuthPersonsMap(data.authorisedPersons);
    }
  }
}

function clearCounterparty() {
  //debugger;   add cleaner for block with archiving data
  EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: null, text: null });
  // EdocsApi.setAttributeValue({code: 'AccountChange', value: null, text: null});//не простовлять
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
}

//endregion
//region set Currency and CounterpartyAccountKind
function setAccounsMap(array) {
  debugger;
  mapAccounts = [];

  array.forEach(x => mapAccounts.push({ Number: x.CounterpartyAccount, Currency: x.CounterpartyCurrency, AccountKind: x.CounterpartyAccountKind, Bank: x.CounterpartyBank, MFO: x.CounterpartyMFO }));
  EdocsApi.setAttributeValue({ code: "CounterpartySing1", value: JSON.stringify(mapAccounts), text: null });
  if (mapAccounts.length > 0) setCurrenAccoundKind(mapAccounts[0].Number);
}

function setCurrenAccoundKind(account) {
  var mapAccounts = EdocsApi.getAttributeValue("CounterpartySing1").value;
  if (mapAccounts) {
    var obj = JSON.parse(mapAccounts).find(x => x.Number == account);
    if (obj) {
      var Currencies = EdocsApi.getDictionaryData("Currencies").find(x => x.value == obj.Currency);
      if (Currencies) EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: Currencies.id, text: Currencies.value, itemCode: Currencies.code });
      EdocsApi.setAttributeValue({ code: "CounterpartyAccount", value: obj.Number, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: obj.AccountKind, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: obj.Bank, text: null });
      EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: obj.MFO, text: null });
    }
  }
}

function onChangeCounterpartyAccount() {
  var CounterpartyAccount = EdocsApi.getAttributeValue("CounterpartyAccount").value;
  if (CounterpartyAccount) {
    setCurrenAccoundKind(CounterpartyAccount);
  } else {
    EdocsApi.setAttributeValue({ code: "CounterpartyAccountKind", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyCurrency", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyBank", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyMFO", value: null, text: null });
  }
}

function actualCounterpartyAndOrg() {
  var OrgEDRPOU = EdocsApi.getAttributeValue("OrgEDRPOU").value;
  OrgEDRPOU = OrgEDRPOU ? OrgEDRPOU : getOrgEDRPOU();
  if (OrgEDRPOU) {
    var data = EdocsApi.getContractorByCode(OrgEDRPOU, "homeOrganization");
    if (data) actualOrganization(data);
  }

  var ContractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId").value;
  if (ContractExtDocId) {
    debugger;
    var data = EdocsApi.runExternalFunction("1C", "edocsGetDoc", { edocsDocId: EdocsApi.getAttributeValue("ContractExtDocId")?.value });
    if (data?.data?.outcontractors[0]) {
      actualContrpaty(data?.data?.outcontractors[0]);
    }
  }
}

function actualOrganization(data) {
  EdocsApi.setAttributeValue({ code: "OrgEDRPOU", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "Accountant", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "OrgName", value: data.shortName, text: null });
  EdocsApi.setAttributeValue({ code: "OrgFullName", value: data.fullName, text: null });
  EdocsApi.setAttributeValue({ code: "OrgINN", value: data.taxId, text: null });

  EdocsApi.setAttributeValue({ code: "OrgMFO", value: data.accounts[0]?.mfo, text: null });
  EdocsApi.setAttributeValue({ code: "OrgBank", value: data.accounts[0]?.bank, text: null });
  EdocsApi.setAttributeValue({ code: "OrgLegalAddress", value: data.legalAddress, text: null });
  EdocsApi.setAttributeValue({ code: "OrgPostalAddress", value: data.addresses[0]?.address, text: null });
  EdocsApi.setAttributeValue({ code: "Organizationid", value: data.contractorId + "|homeOrganization", text: null });
}

function actualContrpaty(data) {
  if (data.TypeContractorDogovor == "С покупателем") {
    EdocsApi.setAttributeValue({ code: "contractorId", value: data.contractorId + "|creditor", text: null });
  } else if (data.TypeContractorDogovor == "С поставщиком") {
    EdocsApi.setAttributeValue({ code: "contractorId", value: data.contractorId + "|debtor", text: null });
  }

  EdocsApi.setAttributeValue({ code: "CounterpartyTaxNumber", value: data.TaxId, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNotResident", value: data.CounterpartyNotResident == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindCustomer", value: data.CounterpartyKindCustomer == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyKindProvider", value: data.CounterpartyKindProvider == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyFeature", value: data.CounterpartyFeature, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyRegion", value: data.CounterpartyRegion, text: null });
  EdocsApi.setAttributeValue({ code: "CorporateIncludes", value: data.CorporateIncludes == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyAddress", value: data.CounterpartyAddress, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyPostalAddress", value: data.CounterpartyPostalAddress, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyPhone", value: data.CounterpartyPhone, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyEmail", value: data.CounterpartyEmail, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartySite", value: data.CounterpartySite, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyCheck", value: data.CounterpartyCheck == "true" ? true : false, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyStatus", value: data.CounterpartyStatus, text: null });
  EdocsApi.setAttributeValue({ code: "AuditDateUntil", value: data.AuditDateUntil != "" ? new Date(data.AuditDateUntil).toISOString() : null, text: null });
  EdocsApi.setAttributeValue({ code: "AdditionalConditions", value: data.AdditionalConditions, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyNumberAgreement", value: data.CounterpartyNumberAgreement || null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearLimit", value: data.CounterpartyYearLimit, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartAmount", value: data.CounterpartAmount || null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyYearAmount", value: data.CounterpartyYearAmount, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: data.code, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: data.ShortName, text: null });

  if (data.accounts && data.accounts.length) {
    mapAccounts = [];
    data.accounts.forEach(x => mapAccounts.push({ Number: x.CounterpartyAccount, Currency: x.CounterpartyCurrency, AccountKind: x.CounterpartyAccountKind, Bank: x.CounterpartyBank, MFO: x.CounterpartyMFO }));
    EdocsApi.setAttributeValue({ code: "CounterpartySing1", value: JSON.stringify(mapAccounts), text: null });
  }
  if (data.authorisedPersons && data.authorisedPersons.length) {
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthorizedPerson1", value: data.authorisedPersons[0].FullName, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPosition", value: data.authorisedPersons[0].Position, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPhone", value: data.authorisedPersons[0].CounterpartyAuthPersPhone, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersEmail", value: data.authorisedPersons[0].CounterpartyAuthPersEmail, text: null });
  }
}
function getOrgEDRPOU() {
  switch (EdocsApi.getAttributeValue("Organizationid").value) {
    case "000000004":
      return "39071152";
    case "000000002":
      return "35942229";
    case "000000013":
      return "32110540";
    default:
      return null;
  }
}

//endregion
//region set CounterpartyAuthPersPhone and CounterpartyAuthPersEmail
var mapAuthPersons = null;

function setAuthPersonsMap(array) {
  var dataAuthPersonMap = EdocsApi.getAttributeValue("DataAuthPersonMap");
  if (!(array && array.length)) {
    dataAuthPersonMap.value = null;
  } else {
    mapAuthPersons = new Map();
    array.forEach(x => mapAuthPersons.set(x.FullName, [x.CounterpartyAuthPersEmail, x.CounterpartyAuthPersPhone]));
    dataAuthPersonMap.value = JSON.stringify(Object.fromEntries(mapAuthPersons));
  }
  safeChangAttr(dataAuthPersonMap);
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
  var counterpartyAuthorizedPerson1 = EdocsApi.getAttributeValue("CounterpartyAuthorizedPerson1").value;
  setAuthorizedPersonPhoneEmail(counterpartyAuthorizedPerson1);
}

function clearContractExtensioInfo() {
  if (EdocsApi.getAttributeValue("FlagProlongClear")?.value == "true") {
    var table = EdocsApi.getAttributeValue("ContractExtensioInfo");
    if (table && table.value.length > 0) {
      table.value = null;
      EdocsApi.setAttributeValue(table);
    }
    /*var table2 = EdocsApi.getAttributeValue('GeneralStorageTerm');
        if(table2 && table2.value.length > 0){
             table2.value = null;
             EdocsApi.setAttributeValue(table2);
         }*/
    EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: false });
  }
}

//endregion
//
function onCreate() {
  EdocsApi.setAttributeValue({ code: "ClearFlag", value: "false", text: null });
  var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
  if (contractExtDocId && !contractExtDocId.value) {
    //EdocsApi.message(`Створіть картку пов’язаного документа   з картки  основного договору  або основний договір не створено в 1С`);
    throw "Створіть картку пов’язаного документа з картки основного договору або основний договір не створено в 1С";
  }
  //EdocsApi.setAttributeValue({code:"e-Docs.Sign", value:null, text:null});
  EdocsApi.setAttributeValue({ code: "CounterpartyManagerESign", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyManageremail", value: null, text: null });

  EdocsApi.setAttributeValue({ code: "AccountChange", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Approvals", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "NameForSubject", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ApprovalNext", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Review", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "SignatureFormat", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "UsedTemplate", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Responsible", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ResponsibleDepartment1", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: true });

  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: null, text: null });
  //EdocsApi.setAttributeValue({code: 'OrgEDRPOU', value: null, text: null});
  //EdocsApi.setAttributeValue({code: 'OrgName', value: null, text: null});
  EdocsApi.setAttributeValue({ code: "contractorId", value: null, text: null });
}

//выбор из таблицы директоров и вывод в поля карточки директоров-подписантов в зависимости от подразделения инициатора и домашней юр.особы
function onBeforeCardSave() {
  debugger;
  var Code = EdocsApi.getAttributeValue("Code");
  if (Code) EdocsApi.setAttributeValue({ code: "Code", value: "Виx / ЛП", text: null });

  setSigner();
  setEDocsDocTypeid();
  hasContractExtDocId();
  var contractExtensioInfo = EdocsApi.getAttributeValue("ContractExtensioInfo");
  if (contractExtensioInfo.value && contractExtensioInfo.value.length) {
    var requiredRow = contractExtensioInfo.value.map(t => t.filter(x => (x.code == "ContractExtensioDoc" && !x.value) || (x.code == "ContractExtensioDate" && !x.value) /*|| x.code == 'ContractExtensio' && !x.value*/)).flat();
    if (requiredRow?.length) {
      throw `Заповніть обов'язкові поля таблиці "ПРОЛОНГАЦІЯ ДОГОВОРУ"`;
    }
  }
  /*var planAmountTitle = EdocsApi.getAttributeValue('PlanAmountTitle');
    if (planAmountTitle && planAmountTitle.value?.length) {
        var requiredRow = planAmountTitle.value.map(t => t.filter(x =>
            x.code == 'PlanAmountStartDate' && !x.value || x.code == 'PlanAmountEndDate' && !x.value || x.code == 'PlanAmount' && !x.value)).flat();
        if (requiredRow?.length) {
            throw `Заповніть обов'язкові поля таблиці "ПЛАНОВА СУМА ДОГОВОРА (БЮДЖЕТ)"`
        }
    }*/
}

// атрибут "Нормативний строк зберігання до:" (StorageTerm) проставити дату з врахуваванням даних колонки Таблиці SP "Кількість років зберагіння"
function setDate() {
  var storageTerm = EdocsApi.getAttributeValue("StorageTerm");
  if (storageTerm && !storageTerm.value) {
    var currDocName = CurrentDocument.templateName;
    var dateDoc = CurrentDocument.created;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0].id;
    var array = EdocsApi.getDictionaryItemData("Term", id);
    var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);
    var term = new Date(dateDoc);
    storageTerm.value = term.setFullYear(term.getFullYear() + years);
    safeChangAttr(storageTerm);
  }
}

//для выбора подписания в электронном или бумажном виде ok
function updateProp(propKey, hidden, required) {
  var prop = EdocsApi.getControlProperties(propKey);
  prop.hidden = hidden;
  prop.required = required;
  EdocsApi.setControlProperties(prop);
}

// Автозаполнение поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function isAct(items) {
  if (!items || !items.length) {
    return;
  }
  var tzOffset = new Date().getTimezoneOffset() * 60000;
  var currentDate = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);
  console.log(`current date ${currentDate}`);
  for (var i in items) {
    if (items[i] != null) {
      var itDate = new Date(new Date(items[i]) - tzOffset).toISOString(); //.slice(0, 10);
      if (itDate >= currentDate) {
        return true;
      }
    }
  }
  return false;
}

function hasInit(dates) {
  for (let i in dates) {
    if (dates[i] != null) {
      return true;
    }
  }
  return false;
}

//статус договора в зависимости от даті окончания действия или даті пролонгации
function setContractStatus() {
  var contractStatus = EdocsApi.getAttributeValue("ContractStatus");
  var dates = [EdocsApi.getAttributeValue("ContarctEndDate").value, EdocsApi.getAttributeValue("ContractExtensioDate").value, EdocsApi.getAttributeValue("ContractExtensioDate1").value];
  if (!hasInit(dates)) {
    contractStatus.value = "Не задано";
  } else if (isAct(dates)) {
    contractStatus.value = "Діючий";
  } else {
    contractStatus.value = "Строк дії закінчився";
  }
  safeChangAttr(contractStatus);
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContarctEndDate() {
  setContractStatus();
  setStoragePeriod();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate1() {
  setContractStatus();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate() {
  setContractStatus();
}

function onChangeDocumentTypeeDocs() {
  /*var storageTerm = EdocsApi.getAttributeValue('StorageTerm');
    if (storageTerm && storageTerm.value === null) {
        setDate();
    }*/
  setEDocsDocTypeid();
  setStoragePeriod();
}

function setSigner() {
  var responsibleDirector = EdocsApi.getAttributeValue("ResponsibleDirector");
  var finDirector = EdocsApi.getAttributeValue("FinDirector");
  var director1 = EdocsApi.getAttributeValue("Director1");
  var director2 = EdocsApi.getAttributeValue("Director2");
  var directorFeature = EdocsApi.getAttributeValue("DirectorFeature");
  var directorFeatureMain = EdocsApi.getAttributeValue("DirectorFeatureMain");
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  var organization = EdocsApi.getAttributeValue("Organization");
  // var responsible = EdocsApi.getAttributeValue('Responsible');
  var bUMDirector2 = EdocsApi.getAttributeValue("BUMDirector2");
  //debugger;
  if (!(managerDepartment.text && organization.value) || !organization.value || !responsibleDirector.value) {
    clearData(director1);
    clearData(director2);
    clearData(bUMDirector2);
    clearData(finDirector);
    clearData(director1);
    clearData(director2);
    clearData(directorFeature);
    clearData(directorFeatureMain);
  } else {
    var array = EdocsApi.getDictionaryData("Directors", null, [
      { attributeCode: "Initiator", value: managerDepartment.text },
      { attributeCode: "Title", value: organization.value },
    ]);
    if (array && array.length) {
      director1.value = array[0].value;
      director2.value = array[0].code;
      //debugger;
      if (responsibleDirector.text == director1.value) {
        finDirector.value = 1;
      } else {
        finDirector.value = 0;
      }
      if (responsibleDirector.text == director2.value) {
        directorFeature.value = "1";
      } else {
        directorFeature.value = "0";
      }

      /*
            if (array && array.length) {
                director1.value = array[0].value;
                director2.value = array[0].code;
                if (director2.value == 'Атякшев Андрій Юрійович') {
                    directorFeatureMain.value = '1';
                } else {
                    directorFeatureMain.value = '0';
                }
            } else {
                clearData(finDirector);
                clearData(director1);
                clearData(director2);
                clearData(directorFeature);
                clearData(directorFeatureMain);
            }
        }*/
      var directorBUM2 = EdocsApi.getDictionaryData("Directors", null, [
        { attributeCode: "ResponsibleDirector", value: responsibleDirector?.text },
        { attributeCode: "Initiator", value: managerDepartment?.text },
        { attributeCode: "Title", value: organization?.value },
        { attributeCode: "Director1", value: director1?.value },
        { attributeCode: "FinDirector", value: director1?.value },
      ])?.[0]?.id;
      EdocsApi.setAttributeValue({ code: "BUMDirector2", value: (directorBUM2 ? 1 : 0).toString(), text: null });

      //debugger;
      var directorBUM = EdocsApi.getDictionaryData("Directors", null, [
        { attributeCode: "ResponsibleDirector", value: responsibleDirector?.text },
        { attributeCode: "Initiator", value: managerDepartment?.text },
        { attributeCode: "Title", value: organization?.value },
        { attributeCode: "FinDirector", value: director1?.value },
      ])?.[0]?.id;
      EdocsApi.setAttributeValue({ code: "DirectorBUM", value: (directorBUM ? 1 : 0).toString(), text: null });
    }
    //EdocsApi.setAttributeValue(bUMDirector2);
    EdocsApi.setAttributeValue(finDirector);
    EdocsApi.setAttributeValue(director1);
    EdocsApi.setAttributeValue(director2);
    EdocsApi.setAttributeValue(directorFeatureMain);
    EdocsApi.setAttributeValue(directorFeature);
  }
}

function clearData(attr) {
  debugger;
  attr.value = null;
  attr.text = null;
  safeChangAttr(attr);
}

// відправка в e-sing при виконанні завдання
function onTaskExecuteSendOutDoc(routeStage) {
  debugger;
  if (routeStage.executionResult == "rejected") {
    return;
  }
  setDataForESIGN();
  var methodData = {
    extSysDocId: CurrentDocument.id,
    ExtSysDocVersion: CurrentDocument.version,
  };
  routeStage.externalAPIExecutingParams = {
    externalSystemCode: "ESIGN", // код зовнішньої системи
    externalSystemMethod: "integration/importDoc", // метод зовнішньої системи
    data: methodData, // дані, що очікує зовнішня система для заданого методу
    executeAsync: true, // виконувати завдання асинхронно
  };
}

function onTaskExecuteSendOutDocESIGN() {
  debugger;
  var sendCreatedDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(),
    documentUrl: CurrentDocument.url,
    docType: EdocsApi.getAttributeValue("DocumentType").value,
    extDocId: EdocsApi.getAttributeValue("ContractExtDocId").value,
    NextPeriod: "Лист про прологацію", //;EdocsApi.getAttributeValue('NextPeriod').text,
  };
  if (hasParentCases()) {
    sendCreatedDoc.ContractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId").value;
  }
  // var organizationId = EdocsApi.getAttributeValue('Organizationid');
  // var organization = {code: 'Organization', value: organizationId.value};
  // var counterparty = {code: 'Counterparty', value: null};
  // var counterpartyId = EdocsApi.getAttributeValue('contractorId')
  // if (counterpartyId.value) {
  //     counterparty.value = counterpartyId.value.split('|')[0];
  // }
  var accounts = [];
  var account = EdocsApi.getAttributeValue("CounterpartyAccount").value;
  var bank = EdocsApi.getAttributeValue("CounterpartyBank").value;
  if (account && bank) {
    accounts.push({ Number: account, Bank: bank });
  }
  sendCreatedDoc.attributes = [
    EdocsApi.getAttributeValue("BudgetPeriod"),
    EdocsApi.getAttributeValue("ConsumptionArticleProcurement"),
    EdocsApi.getAttributeValue("ExpenseItems"),
    EdocsApi.getAttributeValue("ConsumptionArticleMoneyMove"),
    //        {ConsumptionArticleProcurement: EdocsApi.getAttributeValue('ConsumptionArticleProcurement').text},
    //        {ExpenseItems: EdocsApi.getAttributeValue('ExpenseItems').text},
    //        {ConsumptionArticleMoneyMove: EdocsApi.getAttributeValue('ConsumptionArticleMoneyMove').text}
  ];
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
  //table
  var successMessage = "Документ успішно створено в 1С. Ідентифікатор документа ";
  var response = EdocsApi.runExternalFunction("1C", "edocsUpdateDoc", sendCreatedDoc);
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
        if (hasParentCases()) {
          ExtDocID.value = null;
        } else {
          ExtDocID.value = response.data.extDocId;
        }
        var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
        contractExtDocId.value = response.data.extDocId;
        EdocsApi.setAttributeValue(contractExtDocId);
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

// відправки в e-sing
// відправка коментарів та можливість скасування відправлених документів
function onTaskCommentedSendOutDoc(caseTaskComment) {
  debugger;
  var orgCode = EdocsApi.getAttributeValue("OrgEDRPOU").value;
  var orgShortName = EdocsApi.getAttributeValue("OrgName").value;
  if (!orgCode || !orgShortName) {
    return;
  }
  var isCaceling = caseTaskComment.comment && caseTaskComment.comment.toLowerCase().startsWith("#cancel#");
  if (isCaceling) {
    caseTaskComment.comment = caseTaskComment.comment.slice(8);
  }
  var methodData = {
    extSysDocId: CurrentDocument.id,
    extSysDocVersion: CurrentDocument.version,
    eventType: isCaceling ? "CancelProcessing" : "CommentAdded",
    comment: caseTaskComment.comment,
    partyCode: orgCode,
    userTitle: CurrentUser.name,
    partyName: orgShortName,
    occuredAt: new Date(),
  };
  caseTaskComment.externalAPIExecutingParams = {
    externalSystemCode: "ESIGN", // код зовнішньої системи
    externalSystemMethod: "integration/processEvent", // метод зовнішньої системи
    data: methodData, // дані, що очікує зовнішня система для заданого методу
    executeAsync: true, // виконувати завдання асинхронно
  };
}

//выбор ЕДРПОУ юр.особы, запись в скрытое поле "разрез" Accountant ok
function onChangeOrgEDRPOU() {
  var orgEDRPOU = EdocsApi.getAttributeValue("OrgEDRPOU");
  if (orgEDRPOU.value) {
    EdocsApi.setAttributeValue({ code: "Accountant", value: orgEDRPOU.value });
  } else {
    EdocsApi.setAttributeValue({ code: "Accountant", value: null });
  }
}

//region
function onChangeOrgatization() {
  setDirectorsOnRoute();
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
//определение аббревиатуры организации для вывода в маску номера
function setOrganization() {
  var organization = EdocsApi.getAttributeValue("Organization").value;
  var abbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  var prevabbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  if (organization) {
    if (organization == `ДП "СТАДА-УКРАЇНА" (32110540)`) {
      abbreviation.value = "ДП";
    } else if (organization == `ТОВ "ФАРМАЦЕВТИЧНИЙ ЗАВОД 'БІОФАРМА' " (39071152)`) {
      abbreviation.value = "ФЗ";
    } else if (organization == `ТОВ "БІОФАРМА-ІНВЕСТ" (35942229)`) {
      abbreviation.value = "БІ";
    }
  } else {
    abbreviation.value = null;
  }
  if (prevabbreviation.value != abbreviation.value) {
    safeChangAttr(abbreviation);
  }
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
function onRouteStart() {
  var CounterpartyStatus = EdocsApi.getAttributeValue("CounterpartyStatus");
  if (CounterpartyStatus && CounterpartyStatus.value == "Не підлягає") return;

  var currentDate = new Date(CurrentDocument.created).setHours(0, 0, 0, 0);
  var auditDateUntil = EdocsApi.getAttributeValue("AuditDateUntil").value;
  if (!auditDateUntil) throw "По даному контрагенту не вказано дату НПК";
  var auditDate = new Date(auditDateUntil).setHours(0, 0, 0, 0);

  var ContarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate").value;
  if (!ContarctEndDate) throw "По даному контрагенту не вказано скрок дії договору";
  var endDate = new Date(ContarctEndDate).setHours(0, 0, 0, 0);
  if (currentDate > auditDate || currentDate > endDate) {
    if (currentDate > auditDate) throw "По даному контрагенту прострочено дату НПК";
    if (currentDate > endDate) throw "По даному контрагенту строк дії договору закінчився";

    throw "По даному контрагенту прострочено дату НПК та строк дії договору закінчився";
  }
}

function onButtonPushUpdateDoc() {
  debugger;
  var sendRequestDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(),
    documentUrl: CurrentDocument.url,
    docType: EdocsApi.getAttributeValue("DocumentType").value,
    // var initiatorData = EdocsApi.getEmployeeDataByEmployeeID(CurrentDocument.initiatorId);
    extDocId: EdocsApi.getAttributeValue("extDocId").value,
  };
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
  sendRequestDoc.attributes = [
    EdocsApi.getAttributeValue("ContractAmount"),
    EdocsApi.getAttributeValue("OrdNumber"),
    EdocsApi.getAttributeValue("EnteringDate"),
    EdocsApi.getAttributeValue("RegNumber"),
    EdocsApi.getAttributeValue("DocumentKind"),
    EdocsApi.getAttributeValue("DocumentType"),
    EdocsApi.getAttributeValue("AdditionalAgreementCheck"),
    EdocsApi.getAttributeValue("AdditionalAgreementText"),
    EdocsApi.getAttributeValue("ContractAmount"),
    EdocsApi.getAttributeValue("BudgetPlanned"),
    EdocsApi.getAttributeValue("BudgetComment"),
    EdocsApi.getAttributeValue("ResponsibleDepartmentHead"),
    EdocsApi.getAttributeValue("ManagerDepartment"),
    EdocsApi.getAttributeValue("Responsible"),
    EdocsApi.getAttributeValue("Manager"),
    EdocsApi.getAttributeValue("ContarctEndDate"),
    organization,
    counterparty,
    EdocsApi.getAttributeValue("ProcurementInfo"),
    EdocsApi.getAttributeValue("ProcurementInfoTable"),
    EdocsApi.getAttributeValue("ProcurementDate"),
    EdocsApi.getAttributeValue("ProcurementAmount"),
    EdocsApi.getAttributeValue("Settlements"),
    EdocsApi.getAttributeValue("BuNu"),
    // EdocsApi.getAttributeValue('ByDocumentsUU'),  // р
    EdocsApi.getAttributeValue("SettlementsCurrency"),
    EdocsApi.getAttributeValue("PostPayment"),
    EdocsApi.getAttributeValue("BankDays"),
    EdocsApi.getAttributeValue("RegDate1"),
    EdocsApi.getAttributeValue("NameForSubject"),
    EdocsApi.getAttributeValue("PaymentConditionsComment"),
    EdocsApi.getAttributeValue("PlanAmountTitle"),
    EdocsApi.getAttributeValue("ContarctEndDate"),
    EdocsApi.getAttributeValue("ContractExtensioDate"),
    EdocsApi.getAttributeValue("ContractExtensioDate1"),
    { code: "accounts", value: accounts },
    { code: "ResponsibleDepartmentId", value: EdocsApi.getAttributeValue("ManagerDepartment").value },
    { code: "ProjectName", value: EdocsApi.getAttributeValue("ProjectName").value },
    { code: "ResponsibleDepartmentHead", value: EdocsApi.getAttributeValue("ResponsibleDirector").value },
  ];
  //table
  sendRequestDoc.attributes.push(EdocsApi.getAttributeValue("PaymentConditions"));
  sendRequestDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
  sendRequestDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
  var successMessage = "Документ успішно оновлено в 1С";
  var response = EdocsApi.runExternalFunction("1C", "edocsUpdateDoc", sendRequestDoc); //extDocId
  if (response.data.error) {
    if (response.data.error.validationErrors && response.data.error.validationErrors.length > 0) {
      var errorMessage = "";
      for (var i = 0; i < response.data.error.validationErrors.length; i++) {
        errorMessage += response.data.error.validationErrors[i].message + "; ";
      }
      throw response.data.error.details + "  -  " + errorMessage;
    }
  } else if (response.error) {
    throw response.error;
  }
}

//збір даних для передачі в e-sing
function setDataForESIGN() {
  debugger;
  var regDate = EdocsApi.getAttributeValue("RegDate").value;
  var regNumber = EdocsApi.getAttributeValue("RegNumber").value;
  var caseType = EdocsApi.getAttributeValue("TypeDoc").value;
  var caseKind = EdocsApi.getAttributeValue("DocKindeDocsNew").text;
  var name = "";
  if (caseKind) {
    name += caseKind;
  } else {
    name += caseType;
  }
  name += " №" + (regNumber ? regNumber : CurrentDocument.id) + (!regDate ? "" : " від " + moment(regDate).format("DD.MM.YYYY"));
  var doc = {
    SystemCode: "mhp",
    DocumentName: name,
    DocumentType: "Contract",
    Initiator: {
      OrganizationGlobalId: EdocsApi.getAttributeValue("OrgEDRPOU").value,
      CountryOfRegistration: "ua",
      PartyName: EdocsApi.getAttributeValue("OrgName").value,
      ContactPerson: {
        PersonGlobalId: EdocsApi.getAttributeValue("CounterpartyManageremail").value,
      },
      Task: {
        Type: "Sign",
        State: "Completed",
      },
    },
    Parties: [
      {
        OrganizationGlobalId: EdocsApi.getAttributeValue("CounterpartyEDRPOU").value,
        CountryOfRegistration: "ua",
        PartyName: EdocsApi.getAttributeValue("CounterpartyName").value,
        ContactPerson: {
          PersonGlobalId: EdocsApi.getAttributeValue("CounterpartyManageremail").value,
        },
        Task: {
          Type: "Sign",
          State: "New",
          TaskDescription: EdocsApi.getAttributeValue("Comment").value,
        },
      },
    ],
    sendingSettings: {
      attachFiles: "all", //, можна також встановлювати 'firstOnly' - Лише файл із першої зафіксованої вкладки(Головний файл), або 'all' - всі файли, 'fixed' - усі зафіксовані
      attachSignatures: "signatureAndStamp", //  -'signatureAndStamp'Типи “Підпис” або “Печатка”, можна також встановити 'all' - усі типи цифрових підписів
    },
  };
  EdocsApi.setAttributeValue({ code: "LSDJSON", value: JSON.stringify(doc) });
}

//Даний скрипт необхідний для визначення системного виду документа відповідно до обраного користувачем на картці.
function setEDocsDocTypeid() {
  debugger;
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  var i1 = EdocsApi.getAttributeValue("e-DocsDocTypeid");
  if (documentTypeeDocs && documentTypeeDocs.value) {
    var documentTypes = EdocsApi.getDictionaryItemData("DocumentTypes", documentTypeeDocs.value);
    if (documentTypes && documentTypes.attributes) {
      var attributes = documentTypes.attributes;
      var attribute = EdocsApi.findElementByProperty("code", "e_x002d_DocsDocTypeid", attributes);
      if (attribute) {
        if (i1.value != attribute.value) {
          EdocsApi.setAttributeValue({ code: "e-DocsDocTypeid", value: attribute.value });
        }
      } else {
        if (i1.value) {
          EdocsApi.setAttributeValue({ code: "e-DocsDocTypeid", value: null });
        }
      }
    }
  }
}

function onChangeAdditionalContract1С() {
  var additionalContract1С = EdocsApi.getAttributeValue("AdditionalContract1С");
  var docKindContact1С = EdocsApi.getAttributeValue("DocKindContact1С");
  if (additionalContract1С && additionalContract1С.value) {
    docKindContact1С.value = additionalContract1С.value;
  } else {
    docKindContact1С.value = null;
  }
  safeChangAttr(docKindContact1С);
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
        var item = EdocsApi.getEmployeeManagerByEmployeeID(responsible.value, 2).managerId;
        responsibleDirector.value = item;
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
    return EdocsApi.getEmployeeDataByEmployeeID(id).surnameNM;
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
        var item = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value, manager.unitLevel - 1).managerId;
        departmentInitiator.value = item;
        departmentInitiator.text = getName(item);
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

function hasParentCases() {
  var relCase = EdocsApi.getRelatedCases();
  if (relCase && relCase.length && relCase[0].isParentForCurrent) {
    return true;
  }
  return false;
}

//Перевірка наявності зв’язку (ідентифікатору основної угоди) при створенні додаткової угоди
function hasContractExtDocId() {
  var relatedCases = EdocsApi.getRelatedCases();
  var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
  if (relatedCases && relatedCases[0] && !relatedCases[0].isParentForCurrent) {
    if (contractExtDocId && !contractExtDocId.value) {
      //EdocsApi.message(`Створіть картку пов’язаного документа   з картки  основного договору  або основний договір не створено в 1С`);
      throw "Створіть картку пов’язаного документа з картки основного договору або основний договір не створено в 1С";
    }
  }
}

function onChangeManagerDepartment() {
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  if (managerDepartment && managerDepartment.value === null) {
    documentTypeeDocs = { code: "DocumentTypeeDocs", value: null, text: null };
    safeChangAttr(documentTypeeDocs);
  } else {
    onChangeDocumentTypeeDocs();
  }
}

function onChangeTypeProlongation() {
  setDirectorsOnRoute();
  setStoragePeriod();
}

// виведення Відповідальних підписантів при виборі "Виду основного договору" та перевірці Дом. організації ok
function setDirectorsOnRoute() {
  var organization = EdocsApi.getAttributeValue("Organization").value;
  var typeProlongation = EdocsApi.getAttributeValue("TypeProlongation").value;
  if (organization && typeProlongation) {
    var tempData = EdocsApi.getDictionaryData("Directors1", typeProlongation.value, [{ attributecode: "Title", value: organization.value }])[0];
    if (!tempData) {
      return;
    }
    var array = EdocsApi.getDictionaryItemData("Directors1", tempData.id);
    if (!(array && array.length)) {
      return;
    }
    var director1 = EdocsApi.getAttributeValue("Director1");
    var director = EdocsApi.getAttributeValue("Director");
    director1.value = array.find(x => x.code == "Director1");
    director.value = array.find(x => x.code == "Director");
    safeChangAttr(director1);
    safeChangAttr(director);
  }
}

//region Search all
//запрос в 1С на передачу нам инфо о контрагенте ok
function onSearchCounterparty(request) {
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Creditor" });
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Debtor" });
}

//  Відбір переліку договорів із 1С по вибраній домашній організації та контрагенту.
//Із 1С повертається перелік договорів за вказаними вхідними параметрами.
//Після вибору  договору на картці Користувачем із запропонованого переліку записуємо id Договору в полі «AdditionalContract1С» на картці.
function onSearchAdditionalContract1С(data) {
  var DocumentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  if (DocumentCharacter.value == null || DocumentCharacter.value == "Договір") {
    return;
  }
  var Organizationid = EdocsApi.getAttributeValue("Organizationid");
  // var contractorId = EdocsApi.getAttributeValue('contractorId');
  if (Organizationid && Organizationid.value) {
    data.filterCollection.push({ attributeCode: "ContractorType", value: Organizationid.value });
  }
  if (typeProlongation && typeProlongation.value) {
    data.filterCollection.push({ attributeCode: "Title", value: typeProlongation.value });
  }
}

function onSearchTypeDoc(request) {
  var dep = EdocsApi.getAttributeValue("ManagerDepartment").text;
  if (dep) {
    request.filterCollection.push({ attributeCode: "Initiator", value: dep });
  }
}

function onSearchManagerDepartment(request) {
  var typeDoc = EdocsApi.getAttributeValue("TypeDoc").value;
  var docKindeDocsNew = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
  if (docKindeDocsNew) {
    request.filterCollection.push({ attributeCode: "Title", value: docKindeDocsNew });
  }
  if (typeDoc) {
    request.filterCollection.push({ attributeCode: "ManagerDepartment", value: "1" });
  }
}

function onSearchDocumentTypeeDocs(data) {
  var typeProlongation = EdocsApi.getAttributeValue("TypeProlongation");
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  if (managerDepartment && managerDepartment.text) {
    data.filterCollection.push({ attributeCode: "Initiator", value: managerDepartment.text });
  }
  if (typeProlongation && typeProlongation.value) {
    data.filterCollection.push({ attributeCode: "Title", value: typeProlongation.value });
  }
}

//endregion
function safeChangAttr(attr) {
  if (CurrentDocument.isDraft) {
    EdocsApi.setAttributeValue(attr);
  }
}

function onCardInitialize() {
  debugger;
  onChangeManager();
  clearContractExtensioInfo();

  setPropContractExtension();
  // onChangeAddAgrAddingChanges();
  var contarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate");

  var flag = EdocsApi.getAttributeValue("ClearFlag");
  if (flag.value == "false") {
    actualCounterpartyAndOrg();

    var res = EdocsApi.runExternalFunction("1C", "edocsGetDoc", { edocsDocId: EdocsApi.getAttributeValue("ContractExtDocId")?.value });
    if (res) {
      EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: res.data?.outcontractors[0]?.ContarctEndDate, text: null });
      EdocsApi.setAttributeValue({ code: "LetterProlongation", value: res.data?.outcontractors[0]?.LetterProlongation, text: null });
      EdocsApi.setAttributeValue({ code: "ProlongationComent", value: res.data?.outcontractors[0]?.ProlongationComent, text: null });
      EdocsApi.setControlProperties({ code: "ContarctEndDate", hidden: false, disabled: true, required: false });
    } else {
      throw " система 1С не повернула дату закінчення основного договору";
    }
    if (hasParentCases()) {
      EdocsApi.setAttributeValue({ code: "extDocId", value: null });
    }
    clearTables();
    flag.value = "true";
    EdocsApi.setAttributeValue(flag);
  }
  setLinkFieldsDocumentType();
  setPropSignatureFormat();
}
function onChangeProlongationEnd() {
  var ProlongationEnd = EdocsApi.getAttributeValue("ProlongationEnd")?.value;
  if (ProlongationEnd) {
    var currDocName = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0]?.id;
    if (id) {
      var array = EdocsApi.getDictionaryItemData("Term", id);
      var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);

      EdocsApi.setAttributeValue({ code: "ProlongedStorageTerm", value: new Date(new Date(ProlongationEnd).getFullYear() + 1 + years, 0, 1).toISOString(), text: null });
    } else {
      EdocsApi.message("В довіднику відсутній відповідний запис. Будь ласка, зверніться до адміністратора");
    }
  } else {
    EdocsApi.setAttributeValue({ code: "ProlongedStorageTerm", value: null, text: null });
  }
}

function onChangeAddAgrAddingChanges() {
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  if (addAgrAddingChanges.value == "true") {
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", required: true });
    EdocsApi.setControlProperties({ code: "ContractExtensio", required: false });
  } else {
    EdocsApi.setControlProperties({ code: "ContractExtensioDate", required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensioDoc", required: false });
    EdocsApi.setControlProperties({ code: "ContractExtensio", required: false });
  }
}

function clearTables() {
  debugger;
  var planAmountTitle = EdocsApi.getAttributeValue("PlanAmountTitle");
  if (planAmountTitle && planAmountTitle.value && planAmountTitle.value.length) {
    planAmountTitle.value.forEach(t =>
      t.forEach(x => {
        if (x.code == "PlanAmountStartDate" || x.code == "PlanAmountEndDate" || x.code == "PlanAmount") {
          x.value = null;
        }
      })
    );
  }
  console.log(planAmountTitle.value);
  EdocsApi.setAttributeValue(planAmountTitle);
}

function setPropContractExtension() {
  EdocsApi.setControlProperties({ code: "ContractExtensioInfo", hidden: false, required: true });
  EdocsApi.setControlProperties({ code: "ContractExtensioDate", hidden: false, required: true });
  EdocsApi.setControlProperties({ code: "ContractExtensioDoc", hidden: false, required: true });
  EdocsApi.setControlProperties({ code: "ContractExtensio", hidden: false, required: false });
  EdocsApi.setControlProperties({ code: "PlanAmountTitle", hidden: false, required: false });
  EdocsApi.setControlProperties({ code: "PlanAmountStartDate", hidden: false, required: false });
  EdocsApi.setControlProperties({ code: "PlanAmountEndDate", hidden: false, required: false });
  EdocsApi.setControlProperties({ code: "PlanAmount", hidden: false, required: false });
}

//dd 96
function onChangeDocumentType() {
  var documentType = EdocsApi.getAttributeValue("DocumentType");
  if (documentType?.text != "Договір з КОЛ") {
    safeChangAttr({ code: "CounterpartyKOL", value: null, text: null });
    safeChangAttr({ code: "CounterpartyYearAmount", value: null, text: null });
    safeChangAttr({ code: "CounterpartyNumberAgreement", value: null, text: null });
    safeChangAttr({ code: "CounterpartyYearLimit", value: null, text: null });
    safeChangAttr({ code: "CounterpartAmount", value: null, text: null });
  }
  setLinkFieldsDocumentType();
}

function setLinkFieldsDocumentType() {
  var documentType = EdocsApi.getAttributeValue("DocumentType");
  if (documentType?.text == "Договір з КОЛ") {
    EdocsApi.setControlProperties({ code: "CounterpartyKOL", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearAmount", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyNumberAgreement", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearLimit", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartAmount", hidden: false, disabled: false, required: false });
  } else {
    EdocsApi.setControlProperties({ code: "CounterpartyKOL", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearAmount", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyNumberAgreement", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyYearLimit", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartAmount", hidden: true, disabled: false, required: false });
  }
}

//для выбора подписания в электронном или бумажном виде
function onChangeSignatureFormat() {
  //debugger;
  var SignatureOptionAttrValue = EdocsApi.getAttributeValue("SignatureFormat");
  if (!SignatureOptionAttrValue.value || SignatureOptionAttrValue.value === `Підписання паперове` || SignatureOptionAttrValue.value === `Підписання КЕП в MeDoc` || SignatureOptionAttrValue.value === "Підписання КЕП в ВЧАСНО") {
    //docsApi.setAttributeValue({code:"e-Docs.Sign", value:null, text:null});
    EdocsApi.setAttributeValue({ code: "CounterpartyManagerESign", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "CounterpartyManageremail", value: null, text: null });
  }
  setPropSignatureFormat();
}

function setPropSignatureFormat() {
  //debugger;
  var SignatureOptionAttrValue = EdocsApi.getAttributeValue("SignatureFormat");
  if (SignatureOptionAttrValue.value === `Підписання КЕП в e-Sign`) {
    EdocsApi.setControlProperties({ code: "e-Docs.Sign", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "CounterpartyManagerESign", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "CounterpartyManageremail", hidden: false, required: true });
  } else {
    //(!SignatureOptionAttrValue.value || SignatureOptionAttrValue.value === `Підписання паперове` || SignatureOptionAttrValue.value === `Підписання КЕП в MeDoc` || SignatureOptionAttrValue.value === 'Підписання КЕП в ВЧАСНО') {
    EdocsApi.setControlProperties({ code: "e-Docs.Sign", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyManagerESign", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyManageremail", hidden: true, required: false });
  }
}

function setSigner() {
  var responsibleDirector = EdocsApi.getAttributeValue("ResponsibleDirector");
  var finDirector = EdocsApi.getAttributeValue("FinDirector");
  var director1 = EdocsApi.getAttributeValue("Director1");
  var director2 = EdocsApi.getAttributeValue("Director2");
  var directorFeature = EdocsApi.getAttributeValue("DirectorFeature");
  var directorFeatureMain = EdocsApi.getAttributeValue("DirectorFeatureMain");
  var managerDepartment = EdocsApi.getAttributeValue("ManagerDepartment");
  var organization = EdocsApi.getAttributeValue("Organization");
  // var responsible = EdocsApi.getAttributeValue('Responsible');
  var bUMDirector2 = EdocsApi.getAttributeValue("BUMDirector2");
  var director2FIn = EdocsApi.getAttributeValue("Director2FIn");
  //debugger;
  if (!(managerDepartment.text && organization.value) || !organization.value || !responsibleDirector.value) {
    clearData(director1);
    clearData(director2);
    clearData(bUMDirector2);
    clearData(finDirector);
    clearData(director1);
    clearData(director2);
    clearData(directorFeature);
    clearData(directorFeatureMain);
    clearData(director2FIn);
  } else {
    var array = EdocsApi.getDictionaryData("Directors", null, [
      { attributeCode: "Initiator", value: managerDepartment.text },
      { attributeCode: "Title", value: organization.value },
    ]);
    if (array && array.length) {
      director1.value = array[0].value;
      director2.value = array[0].code;
      //debugger;
      if (responsibleDirector.text == director1.value) {
        finDirector.value = 1;
      } else {
        finDirector.value = 0;
      }
      if (responsibleDirector.text == director2.value) {
        directorFeature.value = "1";
      } else {
        directorFeature.value = "0";
      }

      /*
            if (array && array.length) {
                director1.value = array[0].value;
                director2.value = array[0].code;
                if (director2.value == 'Атякшев Андрій Юрійович') {
                    directorFeatureMain.value = '1';
                } else {
                    directorFeatureMain.value = '0';
                }
            } else {
                clearData(finDirector);
                clearData(director1);
                clearData(director2);
                clearData(directorFeature);
                clearData(directorFeatureMain);
            }
        }*/
      var directorBUM2 = EdocsApi.getDictionaryData("Directors", null, [
        { attributeCode: "ResponsibleDirector", value: responsibleDirector?.text },
        { attributeCode: "Initiator", value: managerDepartment?.text },
        { attributeCode: "Title", value: organization?.value },
        { attributeCode: "Director1", value: director1?.value },
        { attributeCode: "FinDirector", value: director1?.value },
      ])?.[0]?.id;
      EdocsApi.setAttributeValue({ code: "BUMDirector2", value: (directorBUM2 ? 1 : 0).toString(), text: null });

      //debugger;
      var directorBUM = EdocsApi.getDictionaryData("Directors", null, [
        /*{attributeCode: 'ResponsibleDirector', value: responsibleDirector?.text},*/ { attributeCode: "Initiator", value: managerDepartment?.text },
        { attributeCode: "Title", value: organization?.value },
        { attributeCode: "FinDirector", value: director1?.value },
      ])?.[0]?.id;
      EdocsApi.setAttributeValue({ code: "DirectorBUM", value: (directorBUM ? 1 : 0).toString(), text: null });

      var director2FIn = EdocsApi.getDictionaryData("Directors", null, [
        /*{attributeCode: 'ResponsibleDirector', value: responsibleDirector?.text},*/ { attributeCode: "Initiator", value: managerDepartment?.text },
        { attributeCode: "Title", value: organization?.value },
        { attributeCode: "FinDirector", value: director2?.value },
      ])?.[0]?.id;
      EdocsApi.setAttributeValue({ code: "Director2FIn", value: (director2FIn ? 1 : 0).toString(), text: null });
    }
    //EdocsApi.setAttributeValue(bUMDirector2);
    EdocsApi.setAttributeValue(finDirector);
    EdocsApi.setAttributeValue(director1);
    EdocsApi.setAttributeValue(director2);
    EdocsApi.setAttributeValue(directorFeatureMain);
    EdocsApi.setAttributeValue(directorFeature);
    //EdocsApi.setAttributeValue(director2FIn);
  }
}

function setStoragePeriod() {
  //storageTerm && storageTerm.value === null &&
  var contarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate");
  var generalStorageTerm = EdocsApi.getAttributeValue("GeneralStorageTerm");
  //var documentCharacter = EdocsApi.getAttributeValue('DocumentCharacter');
  var documentTypeeDocs = EdocsApi.getAttributeValue("NextPeriod");
  if (contarctEndDate.value && !generalStorageTerm.value.length && documentTypeeDocs.value) {
    var currDocName = documentTypeeDocs.text;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0].id;
    var array = EdocsApi.getDictionaryItemData("Term", id);
    var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);
    generalStorageTerm.value = [[{ code: "StorageTerm", value: new Date(new Date(contarctEndDate.value).getFullYear() + 1 + years, 0, 1).toISOString() }]];
  } else {
    generalStorageTerm.value[0]?.forEach(x => {
      if (x.code == "StorageTerm") x.value = null;
    });
  }
  EdocsApi.setAttributeValue(generalStorageTerm);
}

function onChangeContractExtensioInfo() {
  var ProlongationEnd = EdocsApi.getAttributeValue("ProlongationEnd");
  if (ProlongationEnd) {
    ProlongationEnd.value = EdocsApi.getAttributeValue("ContractExtensioInfo")
      ?.value?.pop()
      ?.find(x => x.code == "ContractExtensioDate")?.value;
    EdocsApi.setAttributeValue(ProlongationEnd);
  }
  onChangeProlongationEnd();
}

/*
 //поиск в таблице шарпоинта договоров согласно подразделения инициатора и организации
 function onSearchDocumentTypeeDocs(searchRequest) {
 var ResponsibleDepartmentVal = EdocsApi.getAttributeValue('ManagerDepartment').text;
 var typeDoc = EdocsApi.getAttributeValue('TypeDoc').value;
 if (typeDoc) {
 searchRequest.filterCollection.push({attributeCode: 'Title', value: typeDoc});
 }
 if (ResponsibleDepartmentVal) {
 searchRequest.filterCollection.push({attributeCode: 'Initiator', value: ResponsibleDepartmentVal});
 }
 }
 */
/*
 удалить после первой проверки ели не нужно 90%

 //заполнение данными из 1С дополнительных атрибутов контрагента, которые не вхоят в состав стандартных атрибутов еДокс. Происходит по событию изменения в контроле "контрагент"
 //function onButtonPushGETCONTRACTOR() {
 function onChangecontractorId() {
 var CONTRACTORID = EdocsApi.getAttributeValue('contractorId').value;
 //var contractorID = CONTRACTORID.split('|');
 if (CONTRACTORID) {
 var result = EdocsApi.getDictionaryItemData('Contractor', CONTRACTORID);
 result.attributes.map(x => EdocsApi.setAttributeValue({code: x.code, value: x.value}));
 } else {
 EdocsApi.setAttributeValue({code: 'AdditionalConditions', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'AuditDateUntil', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CorporateIncludes', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartAmount', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyAccountKind', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyAddress', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyCheck', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyCurrency', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyFeature', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyKindCustomer', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyKindProvider', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyNotResident', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyNumberAgreement', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyRegion', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartySite', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyStatus', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyTaxNumber', value: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyYearAmount', value: null});
 EdocsApi.setAttributeValue({code: 'CounterpartyYearLimit', value: null});
 }
 }
 */

function onButtonPushCounterpartyButton() {
  onChangecontractorId(true);
}
