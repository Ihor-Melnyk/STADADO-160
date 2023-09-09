///// Договір з Покупцем ComOps
//заполнение данными из 1С дополнительных атрибутов контрагента, которые не вхоят в состав стандартных атрибутов еДокс. Происходит по событию изменения в контроле "контрагент"
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
  debugger;
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
  EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersPhone", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyAuthPersEmail", value: null, text: null });
}

//endregion
//region set Currency and CounterpartyAccountKind
/*
var mapAccounts = null;

function setAccounsMap(array) {
    // debugger;
    var dataCurrencyAccKind = EdocsApi.getAttributeValue('DataCurrencyAccKind');
    if (array?.length) {
        mapAccounts = new Map();
        array.forEach(x => mapAccounts.set(x.CounterpartyAccount, [x.CounterpartyCurrency, x.CounterpartyAccountKind]));
        dataCurrencyAccKind.value = JSON.stringify(Object.fromEntries(mapAccounts));
        safeChangAttr(dataCurrencyAccKind);
    } 
    else {
        if (dataCurrencyAccKind?.value) {
            Object.entries(JSON.parse(array?.value)).forEach(x => {
                mapAccounts.set(x[0], x[1])
            });
        }
    }
}
*/

function setAccounsMap(array) {
  debugger;
  mapAccounts = [];

  array.forEach(x => mapAccounts.push({ Number: x.CounterpartyAccount, Currency: x.CounterpartyCurrency, AccountKind: x.CounterpartyAccountKind, Bank: x.CounterpartyBank, MFO: x.CounterpartyMFO }));
  EdocsApi.setAttributeValue({ code: "CounterpartySing1", value: JSON.stringify(mapAccounts), text: null });
  if (mapAccounts.length > 0) setCurrenAccoundKind(mapAccounts[0].Number);
}

/*
function setCurrenAccoundKind(account) {
    // debugger
    var counterpartyCurrency = EdocsApi.getAttributeValue('CounterpartyCurrency');
    var counterpartyAccountKind = EdocsApi.getAttributeValue('CounterpartyAccountKind');
    
    if (account) {
        if (mapAccounts?.has(account)) {
            var item1 = EdocsApi.getDictionaryData('Currencies');
            var item = item1.find(x => x.value === mapAccounts.get(account)[0]);
            if (item) {
                counterpartyCurrency = {code: 'CounterpartyCurrency', value: item.id, text: item.value, itemCode: item.code, itemDictionary: 'Currencies'};
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
*/
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
  /*
    if(CounterpartyAccount){
        if(!(mapAccounts?.size)){
            setAccounsMap();
            setTimeout(() => {
                setCurrenAccoundKind(CounterpartyAccount);
            }, 1000);
        }
        else{
            setCurrenAccoundKind(CounterpartyAccount);
        }
    }
    */
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
  var CounterpartyAuthorizedPerson1 = EdocsApi.getAttributeValue("CounterpartyAuthorizedPerson1").value;
  if (CounterpartyAuthorizedPerson1) {
    if (!mapAuthPersons?.size) {
      setAuthPersonsMap();
      setTimeout(() => {
        setAuthorizedPersonPhoneEmail(CounterpartyAuthorizedPerson1);
      }, 1000);
    } else {
      setAuthorizedPersonPhoneEmail(CounterpartyAuthorizedPerson1);
    }
  }
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
    /*var table2 = EdocsApi.getAttributeValue('GeneralStorageTerm');
        if(table2 && table2.value.length > 0){
             table2.value = null;
             EdocsApi.setAttributeValue(table2);
         }*/
    EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: false });
  }
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

function onCreate() {
  EdocsApi.setAttributeValue({ code: "ClearFlag", value: "false", text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyEDRPOU", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "CounterpartyName", value: null, text: null });
  //EdocsApi.setAttributeValue({code: 'OrgEDRPOU', value: null, text: null});
  //EdocsApi.setAttributeValue({code: 'OrgName', value: null, text: null});
  EdocsApi.setAttributeValue({ code: "contractorId", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Responsible", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ResponsibleDepartment1", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "FlagProlongClear", value: true });
  EdocsApi.setAttributeValue({ code: "ResponsibleDirector", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "AccountChange", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Approvals", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "NameForSubject", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ApprovalNext", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Review", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ContractAmount", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "ContractAmountComment", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "PlanAmountGeneral", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "DocumentCharacter", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "HighRiskCategory", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "SignatureFormat", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "BudgetPlanned", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "BudgetComment", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "UsedTemplate", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "RateCurrencyPlanComent", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "DocumentSubject", value: null, text: null });
  EdocsApi.setAttributeValue({ code: "Rate", value: null, text: null });
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
      //clearCounterparty();
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
  //EdocsApi.setAttributeValue({code: 'TaxPayerStatus', value: data.TaxPayerStatus, text: null});
  // EdocsApi.setAttributeValue({code: 'ExciseTaxPayerStatus', value: data.ExciseTaxPayerStatus, text: null});
  //  EdocsApi.setAttributeValue({code: 'AcceptanceResult', value: data.AcceptanceResult, text: null});
  // EdocsApi.setAttributeValue({code: 'CounterpartyKOL', value: (data.KOL == 'true' ? true : false), text: null});
  //EdocsApi.setAttributeValue({code: 'MedEmpCategory', value: data.MedEmpCategory, text: null});
  //EdocsApi.setAttributeValue({code: 'PaymentCategory', value: data.PaymentCategory, text: null});
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
/*
function clearTables() {
    var planAmountTitle = EdocsApi.getAttributeValue('PlanAmountTitle');
    if (planAmountTitle && planAmountTitle.value && planAmountTitle.value.length) {
        var arr = (planAmountTitle.value).map(t => t.map(x => {
            if (x.code == 'PlanAmountStartDate' || x.code == 'PlanAmountEndDate' || x.code == 'PlanAmount') {
                x.value = null;
            }
        }));
    }
    planAmountTitle.value = arr;
    EdocsApi.setAttributeValue(planAmountTitle);
    EdocsApi.setAttributeValue({code: 'PaymentConditions', type: 'table', value: null});
}
*/
function onCardInitialize() {
  // onTaskExecuteRegistration();
  debugger;
  onChangeDocumentCharacter();
  if (new Date("02/12/2023") > new Date(CurrentDocument.created)) EdocsApi.setControlProperties({ code: "ContractAmountChoice", hidden: false, disabled: false, required: false });

  if (!EdocsApi.getAttributeValue("RegDate1").value) {
    EdocsApi.setAttributeValue({ code: "RegDate1", value: EdocsApi.getAttributeValue("RegDate").value, text: null });
  }
  onChangeContractAmountChoice();
  clearContractExtensioInfo();
  onChangeManager();
  setOrganization();
  onChangeResponsible();
  onChangeSignatureFormat();
  setVisibleOnChangeDocumentCharacter();
  onChangeAddAgrAddingChanges();
  //setPropProcurementInfo(); //DD
  var arr = EdocsApi.getRelatedCases();
  var res = arr[0]?.isParentForCurrent;
  if (res) {
    var flag = EdocsApi.getAttributeValue("ClearFlag");
    if (flag.value == "false") {
      actualCounterpartyAndOrg();
      /*       var contarctEndDate = EdocsApi.getAttributeValue('ContarctEndDate');
        var letterProlongation = EdocsApi.getAttributeValue('LetterProlongation');
        var prolongationComent = EdocsApi.getAttributeValue('ProlongationComent');*/
      res = EdocsApi.runExternalFunction("1C", "edocsGetDoc", { edocsDocId: EdocsApi.getAttributeValue("ContractExtDocId")?.value });
      /*var dat = res?.data?.outcontractors[0]?.ContarctEndDate;
        var let = res?.data?.outcontractors[0]?.LetterProlongation;
        var pt = res?.data?.outcontractors[0]?.ProlongationComent;
        */
      if (res) {
        /*
            contarctEndDate.value = dat;
            letterProlongation.value = let;
            prolongationComent.value = pt;
            safeChangAttr(contarctEndDate);
            safeChangAttr(letterProlongation);
            safeChangAttr(prolongationComent);*/
        clearTables();

        EdocsApi.setAttributeValue({ code: "ContarctEndDate", value: res.data?.outcontractors[0]?.ContarctEndDate, text: null });
        EdocsApi.setAttributeValue({ code: "LetterProlongation", value: res.data?.outcontractors[0]?.LetterProlongation, text: null });
        EdocsApi.setAttributeValue({ code: "ProlongationComent", value: res.data?.outcontractors[0]?.ProlongationComent, text: null });
        flag.value = "true";
        EdocsApi.setAttributeValue(flag);
        EdocsApi.setControlProperties({ code: "ContarctEndDate", hidden: false, disabled: true, required: false });
      }
    }
  }
  // onChangeContractAmount();
  setLinkFieldsDocumentType();
  //setPropFieldsContractAmount();
  setPropFieldsContractAmountChoice();
  setPropAddAgrAddingChanges();
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

//выбор из таблицы директоров и вывод в поля карточки директоров-подписантов в зависимости от подразделения инициатора и домашней юр.особы
function onBeforeCardSave() {
  /*if(EdocsApi.getAttributeValue('RegDate1').value == EdocsApi.getAttributeValue('RegDate').value){
        EdocsApi.setAttributeValue({code: 'RegDate1', value: null, text: null});
    }*/
  setOrganization();
  debugger;

  setSigner();
  setTypeProlongation();
  //setEDocsDocTypeid();
  hasContractExtDocId();
  if (hasParentCases()) {
    EdocsApi.setAttributeValue({ code: "extDocId", value: null });
  }
  var planAmountTitle = EdocsApi.getAttributeValue("PlanAmountTitle");
  if (planAmountTitle.value && planAmountTitle.value.length) {
    var requiredRow = planAmountTitle.value.map(t => t.filter(x => (x.code == "PlanAmountStartDate" && !x.value) || (x.code == "PlanAmountEndDate" && !x.value) || (x.code == "PlanAmount" && !x.value))).flat();
    //EdocsApi.message('заповніть будь ласка поля: ');
    if (requiredRow?.length) {
      throw `Заповніть обов'язкові поля блоку "ПЛАНОВА СУМА ДОГОВОРА (БЮДЖЕТ)"`;
    }
  }
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  if (addAgrAddingChanges.value == "true") {
    var contractExtensioInfo = EdocsApi.getAttributeValue("ContractExtensioInfo").value; //ContractExtensioDate
    var len = contractExtensioInfo?.flat();
    if (!len?.length) throw `Заповніть обов'язкові поля блоку "ПРОЛОНГАЦІЯ ДОГОВОРУ"`;
  }
}

//region атрибут "Нормативний строк зберігання до:" (StorageTerm) проставити дату з врахуваванням даних колонки Таблиці SP "Кількість років зберагіння" setDate
function setDate() {
  // debugger;
  var contarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate");
  var storageTerm = EdocsApi.getAttributeValue("StorageTerm");
  if (contarctEndDate.value) {
    var currDocName = CurrentDocument.templateName;
    var id = EdocsApi.getDictionaryData("Term", currDocName, [{ attributeCode: "DocType", value: "0" }])[0].id;
    var array = EdocsApi.getDictionaryItemData("Term", id);
    var years = parseInt(EdocsApi.findElementByProperty("code", "Term", array.attributes).value, 10);
    storageTerm.value = new Date(new Date(contarctEndDate.value).getFullYear() + 1 + years, 0, 1);
    safeChangAttr(storageTerm);
  }
}

function setStoragePeriod() {
  var contarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate");
  var generalStorageTerm = EdocsApi.getAttributeValue("GeneralStorageTerm");
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  if (contarctEndDate.value && !generalStorageTerm.value.length && documentTypeeDocs.value) {
    var currDocName = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
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

function onChangeContarctEndDate() {
  setStoragePeriod();
}

/*
 function onChangeDocumentCharacter() {
 setStoragePeriod();
 }*/
//endregion
//для выбора подписания в электронном или бумажном виде
function onChangeSignatureFormat() {
  //debugger;
  var SignatureOptionAttrValue = EdocsApi.getAttributeValue("SignatureFormat");
  if (!SignatureOptionAttrValue.value || SignatureOptionAttrValue.value === `Підписання паперове` || SignatureOptionAttrValue.value === `Підписання КЕП в MeDoc` || SignatureOptionAttrValue.value === "Підписання КЕП в ВЧАСНО") {
    EdocsApi.setControlProperties({ code: "e-Docs.Sign", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyManagerESign", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "CounterpartyManageremail", hidden: true, required: false });
  } else if (SignatureOptionAttrValue.value === `Підписання КЕП в e-Sign`) {
    EdocsApi.setControlProperties({ code: "e-Docs.Sign", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "CounterpartyManagerESign", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "CounterpartyManageremail", hidden: false, required: true });
  }
}

// Автозаполнение поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function isAct(items) {
  var tzOffset = new Date().getTimezoneOffset() * 60000;
  var currentDate = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);
  console.log(`current date ${currentDate}`);
  for (var i in items) {
    if (items[i] != null) {
      var itDate = new Date(new Date(items[i]) - tzOffset).toISOString(); //.slice(0, 10);
      // debugger;
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
  //debugger
  var contractStatus = EdocsApi.getAttributeValue("ContractStatus");
  var dates = [EdocsApi.getAttributeValue("ContarctEndDate").value, EdocsApi.getAttributeValue("ContractExtensioDate").value, EdocsApi.getAttributeValue("ContractExtensioDate1").value];
  //debugger;
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
/*function onChangeContarctEndDate() {
    setContractStatus();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate1() {
    setContractStatus();
}

// к функции автозаполнения поля "Дата дії договору" в зависимости от даты окончания действия договора, или даты пролонгации
function onChangeContractExtensioDate() {
    setContractStatus();
}*/

//
function onChangeDocumentTypeeDocs() {
  // debugger
  var storageTerm = EdocsApi.getAttributeValue("StorageTerm");
  var documentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  setStoragePeriod();
  setEDocsDocTypeid();
}

function clearData(attr) {
  //debugger
  attr.value = null;
  attr.text = null;
  safeChangAttr(attr);
}

// відправка в e-sing при виконанні завдання
function onTaskExecuteSendOutDoc(routeStage) {
  // debugger;
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
  //function onButtonPushButton() {
  //     var documentCharacter = EdocsApi.getAttributeValue('DocumentCharacter');
  var RegDate1 = EdocsApi.getAttributeValue("RegDate1").value;
  if (!RegDate1) throw 'Заповніть, будь ласка, обов\'язкове поле "Дата договірного документа"';
  var sendCreatedDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(),
    documentUrl: CurrentDocument.url,
    docType: EdocsApi.getAttributeValue("DocumentType").value,
    //ContractExtDocId : EdocsApi.getAttributeValue('DocumentCharacter').value;
  };
  if (isHasDocCharacster()) {
    if (hasParentCases()) {
      sendCreatedDoc.ContractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId").value;
    }
  }
  var RegDate1 = { code: "RegDate1", value: addHours(new Date(RegDate1), 2).toISOString() };
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
    EdocsApi.getAttributeValue("OrdNumber"),
    EdocsApi.getAttributeValue("RegNumberCounterparty"), //
    EdocsApi.getAttributeValue("RateCurrency"), //95
    EdocsApi.getAttributeValue("EnteringDate"),
    EdocsApi.getAttributeValue("RegNumber"),
    EdocsApi.getAttributeValue("DocumentKind"),
    EdocsApi.getAttributeValue("DocumentType"),
    EdocsApi.getAttributeValue("AdditionalAgreementCheck"),
    EdocsApi.getAttributeValue("AdditionalAgreementText"),
    EdocsApi.getAttributeValue("ContractAmount"),
    EdocsApi.getAttributeValue("RateCurrency"), //
    EdocsApi.getAttributeValue("BudgetPlanned"), //
    EdocsApi.getAttributeValue("BudgetComment"),
    EdocsApi.getAttributeValue("PlanAmountGeneral"),
    EdocsApi.getAttributeValue("RateCurrencyPlan"), //
    EdocsApi.getAttributeValue("RateCurrencyPlanComent"), //
    EdocsApi.getAttributeValue("ResponsibleDirector"),
    EdocsApi.getAttributeValue("ManagerDepartment"),
    EdocsApi.getAttributeValue("Responsible"),
    EdocsApi.getAttributeValue("Manager"),
    EdocsApi.getAttributeValue("ContarctEndDate"),
    EdocsApi.getAttributeValue("LetterProlongation"),
    EdocsApi.getAttributeValue("ProlongationComent"),
    organization,
    counterparty,
    EdocsApi.getAttributeValue("ProcurementInfo"), //err
    EdocsApi.getAttributeValue("ProcurementInfoTable"),
    EdocsApi.getAttributeValue("ProcurementDate"),
    EdocsApi.getAttributeValue("ProcurementAmount"),
    EdocsApi.getAttributeValue("Settlements"),
    EdocsApi.getAttributeValue("BuNu"),
    EdocsApi.getAttributeValue("SettlementsCurrency"),
    EdocsApi.getAttributeValue("PostPayment"),
    EdocsApi.getAttributeValue("BankDays"),
    // EdocsApi.getAttributeValue('RegDate1'),
    RegDate1,

    EdocsApi.getAttributeValue("CounterpartyStatusBoolean"),
    EdocsApi.getAttributeValue("PaymentConditions"),
    EdocsApi.getAttributeValue("PostPayment"),
    EdocsApi.getAttributeValue("BankDays"),

    EdocsApi.getAttributeValue("NameForSubject"),
    EdocsApi.getAttributeValue("PaymentConditionsComment"),
    EdocsApi.getAttributeValue("PlanAmountTitle"),
    EdocsApi.getAttributeValue("DocKindContact1С"),
    // EdocsApi.getAttributeValue('ContarctEndDate'),
    // EdocsApi.getAttributeValue('ContractExtensioDate'),
    // EdocsApi.getAttributeValue('ContractExtensioDate1'),
    //EdocsApi.getAttributeValue('ResponsibleDepartment1').text,
    EdocsApi.getAttributeValue("ProjectName"),
    { code: "accounts", value: accounts },
    { code: "ResponsibleDepartmentId", value: EdocsApi.getAttributeValue("ManagerDepartment").value },
    { code: "ResponsibleDepartment1", value: EdocsApi.getAttributeValue("ResponsibleDepartment1").text },
    EdocsApi.getAttributeValue("ResponsibleDirector"),
  ];
  //table
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PaymentConditions"));
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("PlanAmountTitle"));
  sendCreatedDoc.attributes.push(EdocsApi.getAttributeValue("ContractExtensioInfo"));
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

//збір даних для передачі в e-sing
function setDataForESIGN() {
  // debugger;
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

// відправки в e-sing відправка коментарів та можливість скасування відправлених документів
function onTaskCommentedSendOutDoc(caseTaskComment) {
  // debugger;
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

function onChangeOrganization() {
  setOrganization();
}

//определение аббревиатуры организации для вывода в маску номера
function setOrganization() {
  debugger;
  var organization = EdocsApi.getAttributeValue("Organization").value;
  var abbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  var prevabbreviation = EdocsApi.getAttributeValue("OrganizationAbv");
  if (organization) {
    if (organization == `ДП "СТАДА-УКРАЇНА" (32110540)`) {
      abbreviation.value = "ДП.1";
    } else if (organization == `ТОВ "ФАРМАЦЕВТИЧНИЙ ЗАВОД 'БІОФАРМА' " (39071152)`) {
      abbreviation.value = "ФЗ.1";
    } else if (organization == `ТОВ "БІОФАРМА-ІНВЕСТ" (35942229)`) {
      abbreviation.value = "БІ.1";
    }
  } else {
    abbreviation.value = null;
    // setSigner();  // call
  }
  if (prevabbreviation.value != abbreviation.value) {
    safeChangAttr(abbreviation);
  }
}

//блокировка запуска по маршруту, если текущая дата больше даты НПК
function onRouteStart() {
  /*var CounterpartyStatus = EdocsApi.getAttributeValue('CounterpartyStatus').value;
    if(CounterpartyStatus && CounterpartyStatus.value == "Не підлягає") 
        return;
    */
  var currentDate = new Date(CurrentDocument.created).setHours(0, 0, 0, 0);
  var auditDateUntil = EdocsApi.getAttributeValue("AuditDateUntil").value;
  if (EdocsApi.getAttributeValue("CounterpartyStatus").value != "Не підлягає") {
    if (!auditDateUntil) throw "По даному контрагенту не вказано дату НПК";
    var auditDate = new Date(auditDateUntil).setHours(0, 0, 0, 0);
    if (currentDate > auditDate) throw "По даному контрагенту прострочено дату НПК";
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  var ContarctEndDate = EdocsApi.getAttributeValue("ContarctEndDate").value;
  if (!ContarctEndDate) throw "По даному контрагенту не вказано скрок дії договору";
  if (currentDate > new Date(ContarctEndDate).setHours(0, 0, 0, 0)) throw "По даному контрагенту строк дії договору закінчився";
}

function onButtonPushUpdateDoc() {
  var sendRequestDoc = {
    userId: CurrentUser.login,
    edocsDocId: CurrentDocument.id,
    linkedDocs: EdocsApi.getRelatedCases(), // подходит или  мапинг
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
    EdocsApi.getAttributeValue("ProcurementInfo"),
    EdocsApi.getAttributeValue("ProcurementInfoTable"),
    EdocsApi.getAttributeValue("ProcurementDate"),
    EdocsApi.getAttributeValue("ProcurementAmount"),
    EdocsApi.getAttributeValue("Settlements"),
    EdocsApi.getAttributeValue("BuNu"),
    EdocsApi.getAttributeValue("SettlementsCurrency"),
    EdocsApi.getAttributeValue("PostPayment"),
    EdocsApi.getAttributeValue("BankDays"),
    EdocsApi.getAttributeValue("RegDate1"),
    EdocsApi.getAttributeValue("NameForSubject"),
    EdocsApi.getAttributeValue("PaymentConditionsComment"),
    EdocsApi.getAttributeValue("PlanAmountTitle"), //добавила
    // EdocsApi.getAttributeValue('LetterProlongation'),
    // EdocsApi.getAttributeValue('ProlongationComent'),
    // EdocsApi.getAttributeValue('RegNumberCounterparty'), //95
    // EdocsApi.getAttributeValue('RateCurrency'), //95
    // EdocsApi.getAttributeValue('Rate'), //95
    { code: "accounts", value: accounts },
    { code: "ResponsibleDepartmentId", value: EdocsApi.getAttributeValue("ManagerDepartment").value },
    { code: "ProjectName", value: EdocsApi.getAttributeValue("ProjectName").value },
    { code: "ResponsibleDepartmentHead", value: EdocsApi.getAttributeValue("ResponsibleDirector").value },
    organization,
    counterparty,
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

//Даний скрипт необхідний для визначення системного виду документа відповідно до обраного користувачем на картці.
function setEDocsDocTypeid() {
  var documentTypeeDocs = EdocsApi.getAttributeValue("DocumentTypeeDocs");
  // debugger;
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

//  При виборі Користувачем в полі «Характер договірного документу» (DocumentCharacter) значень: «Додаток», «Додаткова угода», «Специфікація», відображати скриті поля «№ Додатку/ДУ/Специфікації» (SerialNumber) та «Договірним документом вносяться зміни до умов основного договору» (AddAgrAddingChanges).*/
function onChangeDocumentCharacter() {
  // debugger;
  var documentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  var serialNumber = EdocsApi.getAttributeValue("AdditionalAgreementText");
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  var additionalContract1С = EdocsApi.getAttributeValue("AdditionalContract1С");
  if (!(documentCharacter.value == "Додаток" || documentCharacter.value == "Додаткова угода" || documentCharacter.value == "Специфікація")) {
    serialNumber.value = null;
    addAgrAddingChanges.value = "false";
    serialNumber.text = null;
    addAgrAddingChanges.text = null;
    additionalContract1С.value = null;
    additionalContract1С.text = null;
    safeChangAttr(serialNumber);
    safeChangAttr(addAgrAddingChanges);
    safeChangAttr(additionalContract1С);
  }
  setVisibleOnChangeDocumentCharacter();

  if (documentCharacter.value && documentCharacter.value != "Договір") {
    setControlHidden("CounterpartyStatusBoolean", false);
  } else {
    setControlHidden("CounterpartyStatusBoolean", true);
    EdocsApi.setAttributeValue({ code: "CounterpartyStatusBoolean", value: "false", text: null });
    // onChangeCounterpartyStatusBoolean();
  }
}

function onChangeCounterpartyStatusBoolean() {
  var CounterpartyStatusBoolean = EdocsApi.getAttributeValue("CounterpartyStatusBoolean").value;
  if (CounterpartyStatusBoolean == "true") {
    var DocKindeDocsNew = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
    if (DocKindeDocsNew == 'ДД "з Продавцем" ComOps' || DocKindeDocsNew == 'ДД "з Продавцем" TechOps') {
      setPropTablesPaymentConditions(true);
    } else {
      setPropTablesPaymentConditions(false);
    }
    if (DocKindeDocsNew == 'ДД "з Покупцем"  TechOps' || DocKindeDocsNew == 'ДД "з Покупцем"  ComOps') {
      setPropTablesGeneralPlan(true);
    } else {
      setPropTablesGeneralPlan(false);
    }
  } else {
    setPropTablesPaymentConditions(false);
    setPropTablesGeneralPlan(false);
  }
}

function setPropTablesPaymentConditions(state) {
  EdocsApi.setControlProperties({ code: "PaymentConditionsPercent", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsDays", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsDocument", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PaymentConditionsComment", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "GeneralComment1", hidden: !state, disabled: false, required: state });
}

function setPropTablesGeneralPlan(state) {
  EdocsApi.setControlProperties({ code: "GeneralPlanAmountTitle", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "PostPayment", hidden: !state, disabled: false, required: state });
  EdocsApi.setControlProperties({ code: "BankDays", hidden: !state, disabled: false, required: state });
}

function setVisibleOnChangeDocumentCharacter() {
  var documentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  if (documentCharacter.value == "Додаток" || documentCharacter.value == "Додаткова угода" || documentCharacter.value == "Специфікація") {
    EdocsApi.setControlProperties({ code: "AdditionalAgreementText", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "AddAgrAddingChanges", hidden: false, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "AdditionalContract1С", hidden: true, disabled: false, required: false });
  } else {
    EdocsApi.setControlProperties({ code: "AdditionalAgreementText", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "AddAgrAddingChanges", hidden: true, disabled: false, required: false });
    EdocsApi.setControlProperties({ code: "AdditionalContract1С", hidden: true, disabled: false, required: false });
  }
}

function onChangeAdditionalContract1С() {
  // debugger
  var additionalContract1С = EdocsApi.getAttributeValue("AdditionalContract1С");
  var docKindContact1С = EdocsApi.getAttributeValue("DocKindContact1С");
  if (additionalContract1С && additionalContract1С.value) {
    docKindContact1С.value = additionalContract1С.value;
  } else {
    docKindContact1С.value = null;
  }
  safeChangAttr(docKindContact1С);
}

function getName(id) {
  if (id) {
    //return EdocsApi.getEmployeeDataByEmployeeID(id).surnameNM;
    return EdocsApi.getEmployeeDataByEmployeeID(id).fullName;
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

function isHasDocCharacster() {
  var documentCharacter = EdocsApi.getAttributeValue("DocumentCharacter").value;
  if ((documentCharacter && documentCharacter == `Додаткова угода`) || documentCharacter == `Додаток` || documentCharacter == `Специфікація`) {
    return true;
  }
  return false;
}

function hasParentCases() {
  //debugger;
  var relCase = EdocsApi.getRelatedCases();
  if (relCase && relCase.length && relCase[0].isParentForCurrent) {
    return true;
  }
  return false;
}

//Перевірка наявності зв’язку (ідентифікатору основної угоди) при створенні додаткової угоди
function hasContractExtDocId() {
  var contractExtDocId = EdocsApi.getAttributeValue("ContractExtDocId");
  if (isHasDocCharacster()) {
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

function setTypeProlongation() {
  var DocKindeDocsNew = EdocsApi.getAttributeValue("DocKindeDocsNew");
  if (DocKindeDocsNew && DocKindeDocsNew.value) {
    EdocsApi.setAttributeValue({ code: "TypeProlongation", value: DocKindeDocsNew.value, text: null });
  }
}

//region поиск в таблице шарпоинта договоров согласно подразделения инициатора и организации
function onSearchDocumentTypeeDocs(searchRequest) {
  //debugger;
  var ResponsibleDepartmentVal = EdocsApi.getAttributeValue("ManagerDepartment").text;
  var typeDoc = EdocsApi.getAttributeValue("TypeDoc").value;
  if (typeDoc) {
    searchRequest.filterCollection.push({ attributeCode: "Title", value: typeDoc });
  }
  if (ResponsibleDepartmentVal) {
    searchRequest.filterCollection.push({ attributeCode: "Initiator", value: ResponsibleDepartmentVal });
  }
}

//запрос в 1С на передачу нам инфо о контрагенте
function onSearchCounterparty(request) {
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Creditor" });
  request.filterCollection.push({ attributeCode: "ContractorType", value: "Debtor" });
}

function onSearchManagerDepartment(request) {
  // debugger;
  var typeDoc = EdocsApi.getAttributeValue("TypeDoc").value;
  var docKindeDocsNew = EdocsApi.getAttributeValue("DocKindeDocsNew").value;
  if (docKindeDocsNew) {
    request.filterCollection.push({ attributeCode: "Title", value: docKindeDocsNew });
  }
  if (typeDoc) {
    request.filterCollection.push({ attributeCode: "ManagerDepartment", value: "1" });
  }
}

function onSearchTypeDoc(request) {
  //debugger;
  var dep = EdocsApi.getAttributeValue("ManagerDepartment").text;
  if (dep) {
    request.filterCollection.push({ attributeCode: "Initiator", value: dep });
  }
}

//  Відбір переліку договорів із 1С по вибраній домашній організації та контрагенту.
//Після вибору  договору на картці Користувачем із запропонованого переліку записуємо id Договору в полі «AdditionalContract1С» на картці.
function onSearchAdditionalContract1С(data) {
  var DocumentCharacter = EdocsApi.getAttributeValue("DocumentCharacter");
  if (DocumentCharacter.value == null || DocumentCharacter.value == "Договір") {
    return;
  }
  var Organizationid = EdocsApi.getAttributeValue("Organizationid");
  var contractorId = EdocsApi.getAttributeValue("contractorId");
  if (Organizationid && Organizationid.value) {
    data.filterCollection.push({ attributeCode: "ContractorType", value: Organizationid.value });
  }
  if (contractorId && contractorId.value) {
    data.filterCollection.push({ attributeCode: "ContractorType", value: contractorId.value });
  }
}

//endregion
function safeChangAttr(attr) {
  if (CurrentDocument.isDraft) {
    EdocsApi.setAttributeValue(attr);
  }
}

function onButtonPushButton() {
  var data = {
    Counterparty: EdocsApi.getAttributeValue("Counterparty"),
    CounterpartyAccount: EdocsApi.getAttributeValue("CounterpartyAccount"),
    CounterpartyCurrency: EdocsApi.getAttributeValue("CounterpartyCurrency"),
    CounterpartyBank: EdocsApi.getAttributeValue("CounterpartyBank"),
    CounterpartyMFO: EdocsApi.getAttributeValue("CounterpartyMFO"),
    CounterpartyName: EdocsApi.getAttributeValue("CounterpartyName"),
    CounterpartyFullName: EdocsApi.getAttributeValue("CounterpartyFullName"),
    CounterpartyEDRPOU: EdocsApi.getAttributeValue("CounterpartyEDRPOU"),
    CounterpartyINN: EdocsApi.getAttributeValue("CounterpartyINN"),
    CounterpartyLegalAddress: EdocsApi.getAttributeValue("CounterpartyLegalAddress"),
    CounterpartyPostalAddress: EdocsApi.getAttributeValue("CounterpartyPostalAddress"),
    CounterpartyPhone: EdocsApi.getAttributeValue("CounterpartyPhone"),
    CounterpartyEmail: EdocsApi.getAttributeValue("CounterpartyEmail"),
    CounterpartyAuthorizedPerson1: EdocsApi.getAttributeValue("CounterpartyAuthorizedPerson1"),
    CounterpartyAuthPersPosition: EdocsApi.getAttributeValue("CounterpartyAuthPersPosition"),
    CounterpartyAuthPersEmail: EdocsApi.getAttributeValue("CounterpartyAuthPersEmail"),
    CounterpartyCheckOK: EdocsApi.getAttributeValue("CounterpartyCheck"),
    CounterpartyStatus: EdocsApi.getAttributeValue("CounterpartyStatus"),
    AuditDateUntil: EdocsApi.getAttributeValue("AuditDateUntil"),
    AdditionalConditions: EdocsApi.getAttributeValue("AdditionalConditions"),
    CounterpartyYearAmount: EdocsApi.getAttributeValue("CounterpartyYearAmount"),
    CounterpartyNumberAgreement: EdocsApi.getAttributeValue("CounterpartyNumberAgreement"),
    CounterpartyYearLimit: EdocsApi.getAttributeValue("CounterpartyYearLimit"),
    CounterpartAmount: EdocsApi.getAttributeValue("CounterpartAmount"),
    contractorId: EdocsApi.getAttributeValue("contractorId"),
  };
  console.log(data);
}

function onChangeProcurementInfo() {
  var procurementInfo = EdocsApi.getAttributeValue("ProcurementInfo");
  if (procurementInfo && procurementInfo.text == "Відбувся") {
    EdocsApi.setControlProperties({ code: "ProcurementAmount", required: true });
    EdocsApi.setControlProperties({ code: "ProcurementDate", required: true });
  } else {
    EdocsApi.setControlProperties({ code: "ProcurementAmount", required: false });
    EdocsApi.setControlProperties({ code: "ProcurementDate", required: false });
  }
}

//очистка таблиц Плановая сума и условия оплати
function clearTables() {
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
  EdocsApi.setAttributeValue(planAmountTitle);
  EdocsApi.setAttributeValue({ code: "PaymentConditions", type: "table", value: null });
}
/*
function onChangeContractAmount() {
    var contractAmount = EdocsApi.getAttributeValue('ContractAmount');
    var contractAmountChoice = EdocsApi.getAttributeValue('ContractAmountChoice');
    if (contractAmount.value == 0 || !contractAmount.value) {
        safeChangAttr({code: 'ContractAmountChoice', value: null, text: null});
        safeChangAttr({code: 'RateCurrency', value: null, text: null});
        safeChangAttr({code: 'ContractAmountComment', value: null, text: null});
        safeChangAttr({code: 'Rate', value: null, text: null});
    } else {
        safeChangAttr({code: 'ContractAmountChoice', value: null, text: null});
        safeChangAttr({code: 'PlanAmountGeneral', value: null, text: null})
        safeChangAttr({code: 'RateCurrencyPlan', value: null, text: null})
        safeChangAttr({code: 'RateCurrencyPlanComent', value: null, text: null})
        setPropFieldsContractAmountChoice();
    }
    //safeChangAttr({code:'Rate', value: null, text: null});  //delete comment on onTaskExecuteRegistration
    setPropFieldsContractAmount();
}

function setPropFieldsContractAmount() {
    var contractAmount = EdocsApi.getAttributeValue('ContractAmount');
    var contractAmountChoice = EdocsApi.getAttributeValue('ContractAmountChoice');
    if (contractAmount.value == 0 || !contractAmount.value) {
        EdocsApi.setControlProperties({code: 'ContractAmountChoice', hidden: false, required:true});
        EdocsApi.setControlProperties({code: 'RateCurrency', hidden: true, required:false});
        EdocsApi.setControlProperties({code: 'ContractAmountComment', hidden: true});
    } else {
        EdocsApi.setControlProperties({code: 'ContractAmountChoice', hidden: true, required:false});
        EdocsApi.setControlProperties({code: 'RateCurrency', hidden: false, required:true});
        EdocsApi.setControlProperties({code: 'ContractAmountComment', hidden: false});
    }
}
*/
function setPropFieldsContractAmountChoice() {
  var contractAmountChoice = EdocsApi.getAttributeValue("ContractAmountChoice");
  if (contractAmountChoice?.value == "Рамковий договір") {
    EdocsApi.setControlProperties({ code: "PlanAmountGeneral", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "RateCurrencyPlan", hidden: false, required: true });
    EdocsApi.setControlProperties({ code: "RateCurrencyPlanComent", hidden: false });
  } else {
    EdocsApi.setControlProperties({ code: "PlanAmountGeneral", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "RateCurrencyPlan", hidden: true, required: false });
    EdocsApi.setControlProperties({ code: "RateCurrencyPlanComent", hidden: true });
  }
}

/*
 function onTaskExecuteRegistration(routeStage) {
 if (routeStage.executionResult == 'executed') {
 // debugger;
 onChangeOrganization();
 // setRegDate();
 }
 }*/

//
function onTaskExecuteRegistration(routeStage) {
  if (routeStage.executionResult == "executed") {
    onChangeOrganization();
    EdocsApi.setAttributeValue({ code: "RegDate1", value: EdocsApi.getAttributeValue("RegDate").value, text: null });
    var regDate1 = EdocsApi.getAttributeValue("RegDate1");

    if (regDate1.value) {
      var arrayRate = EdocsApi.getDictionaryData("Currencies");
      var contractAmount = EdocsApi.getAttributeValue("ContractAmount").value;
      if (contractAmount) {
        var rateCurrency = EdocsApi.getAttributeValue("RateCurrency");
        if (rateCurrency.text) {
          rateCurrency = arrayRate.find(x => x.value == rateCurrency.text).code;
        } else {
          throw "Помилка! Не вказана валюта суми довогору";
        }
        if (Number(rateCurrency) != 978) {
          var cours = EdocsApi.runExternalFunction("1C", "getCurrencyExchange", { currencyIn: rateCurrency, currencyOut: "978", exchangeDate: regDate1.value });
          if (cours?.data?.exchangeRate) {
            contractAmount = (Number(contractAmount) / cours.data.exchangeRate).toFixed(2);
          } else {
            throw 'Помилка! В довіднику відсутній курс для валюти "' + EdocsApi.getAttributeValue("RateCurrency").text + '" на дату ' + moment(new Date(regDate1.value)).format("DD.MM.YYYY");
          }
        }
      }
      var planAmountGeneral = EdocsApi.getAttributeValue("PlanAmountGeneral").value;
      if (planAmountGeneral) {
        var rateCurrencyPlan = EdocsApi.getAttributeValue("RateCurrencyPlan");
        if (rateCurrencyPlan.text) {
          rateCurrencyPlan = arrayRate.find(x => x.value == rateCurrencyPlan.text).code;
        } else {
          throw "Помилка! Не вказана валюта планової суми";
        }
        if (Number(rateCurrencyPlan) != 978) {
          var cours = EdocsApi.runExternalFunction("1C", "getCurrencyExchange", { currencyIn: rateCurrencyPlan, currencyOut: "978", exchangeDate: regDate1.value });
          if (cours?.data?.exchangeRate) {
            planAmountGeneral = (Number(planAmountGeneral) / cours.data.exchangeRate).toFixed(2);
          } else {
            throw 'Помилка! В довіднику відсутній курс для валюти "' + EdocsApi.getAttributeValue("RateCurrencyPlan").text + '" на дату ' + moment(new Date(regDate1.value)).format("DD.MM.YYYY");
          }
        }
      }
      EdocsApi.setAttributeValue({ code: "Rate", value: Number(contractAmount) > Number(planAmountGeneral) ? contractAmount : planAmountGeneral, text: null });
    } else {
      throw "Помилка! Відсутня реєстарційна дата";
    }
  }
}
/*
 function onChangeRateCurrency (){
 safeChangAttr({code:'Rate', value: null, text: null});
 }
function onChangeRateCurrencyPlan() {
    safeChangAttr({code: 'Rate', value: null, text: null});
    // onChangeRateCurrency();// temp delete
}

function onChangePlanAmountGeneral() {
    safeChangAttr({code: 'Rate', value: null, text: null});
}*/

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

function setSigner() {
  debugger;
  var Approval = EdocsApi.getCaseTaskDataByCode("Approval");
  if (Approval && !(Approval.executionState == "complete")) {
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
}

function onChangeAddAgrAddingChanges() {
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  if (addAgrAddingChanges.value != "true") {
    // EdocsApi.setAttributeValue({code:'ContractExtensioInfo', value: null, type:'table'});

    hiddeneControl("ContractExtensioInfo");
    hiddeneControl("ContractExtensioDate");
    hiddeneControl("ContractExtensioDoc");
    hiddeneControl("ContractExtensio");
  } else {
    showControl("ContractExtensioInfo");
    showControl("ContractExtensioDate");
    showControl("ContractExtensioDoc");
    showControl("ContractExtensio");
    /*
        EdocsApi.setControlProperties({code: 'ContractExtensioInfo', hidden: false, disabled: false, required: false});
        EdocsApi.setControlProperties({code: 'ContractExtensioDate', hidden: false, disabled: false, required: false});
        EdocsApi.setControlProperties({code: 'ContractExtensioDoc', hidden: false, disabled: false, required: false});
        EdocsApi.setControlProperties({code: 'ContractExtensio', hidden: false, disabled: false, required: false});
        */
  }
  setPropAddAgrAddingChanges();
}

function hiddeneControl(CODE) {
  control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.hidden = true;
    EdocsApi.setControlProperties(control);
  }
}
function showControl(CODE) {
  control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.hidden = false;
    EdocsApi.setControlProperties(control);
  }
}
function requiredControl(CODE) {
  control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.required = true;
    EdocsApi.setControlProperties(control);
  }
}
function notRequiredControl(CODE) {
  control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.required = false;
    EdocsApi.setControlProperties(control);
  }
}

function setControlDisabled(CODE, state) {
  var control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.disabled = state;
    EdocsApi.setControlProperties(control);
  }
}

function setControlHidden(CODE, state) {
  var control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.hidden = state;
    EdocsApi.setControlProperties(control);
  }
}

function setPropAddAgrAddingChanges() {
  var addAgrAddingChanges = EdocsApi.getAttributeValue("AddAgrAddingChanges");
  if (addAgrAddingChanges.value == "true") {
    requiredControl("ContractExtensioDate");
    requiredControl("ContractExtensioDoc");
    requiredControl("ContractExtensio");
  } else {
    notRequiredControl("ContractExtensioDate");
    notRequiredControl("ContractExtensioDoc");
    notRequiredControl("ContractExtensio");
  }
}

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);
  return date;
}

function onChangeContractAmountChoice() {
  var ContractAmountChoice = EdocsApi.getAttributeValue("ContractAmountChoice").value;
  if (ContractAmountChoice == "Оплата за документом не передбачена") {
    setControlRequired("PlanAmountTitle", false);
    setControlRequired("PlanAmountStartDate", false);
    setControlRequired("PlanAmountEndDate", false);
    setControlRequired("ConsumptionArticleProcurement", false);
    setControlRequired("PlanAmount", false);
    setControlRequired("ConsumptionArticleMoneyMove", false);
    setControlRequired("ExpenseItems", false);
    setControlRequired("PaymentConditions", false);
    setControlRequired("PaymentConditionsPercent", false);
    setControlRequired("PaymentConditionsDays", false);
    setControlRequired("PaymentConditionsDocument", false);
    setControlRequired("GeneralProcurement", false);
    setControlRequired("ProcurementInfo", false);
  } else {
    setControlRequired("PlanAmountTitle", true);
    setControlRequired("PlanAmountStartDate", true);
    setControlRequired("PlanAmountEndDate", true);
    setControlRequired("ConsumptionArticleProcurement", true);
    setControlRequired("PlanAmount", true);
    setControlRequired("ConsumptionArticleMoneyMove", true);
    setControlRequired("ExpenseItems", true);
    setControlRequired("PaymentConditions", true);
    setControlRequired("PaymentConditionsPercent", true);
    setControlRequired("PaymentConditionsDays", true);
    setControlRequired("PaymentConditionsDocument", true);
    setControlRequired("GeneralProcurement", true);
    setControlRequired("ProcurementInfo", true);
  }
  setPropFieldsContractAmountChoice();
}

function setControlRequired(CODE, state) {
  var control = EdocsApi.getControlProperties(CODE);
  if (control) {
    control.required = state;
    EdocsApi.setControlProperties(control);
  }
}

/* Для очистки архівних атрибутів
 function clearArchivBlock() {
 debugger
 EdocsApi.setAttributeValue({code: 'RegDate1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'AccountChange', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'Archive', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDate1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataResponsible1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataPlace1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataPlace', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataNumber1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataReturn', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataComment', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataOutsource', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDate2', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataNumber2', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataName', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataResponsible2', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataOutsourceAddress', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataOutsourceDate1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataOutsourceDocument1', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDate', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataOutsourceDocument', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'DocDelete', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDisposal', value: 'false', text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDate3', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataNumber3', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataDisposalScan', value: null, text: null});
 EdocsApi.setAttributeValue({code: 'ArchiveDataPlace2', value: null, text: null});
 }*/

function onButtonPushCounterpartyButton() {
  onChangecontractorId(true);
}
