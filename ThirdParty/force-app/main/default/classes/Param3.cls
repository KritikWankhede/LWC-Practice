public class Param3 {
	public decimal price;
    public decimal SalesTaxi(Decimal taxrate){
      	return price*taxrate;
	}
    public decimal TotalPriceDecimal(Decimal taxrate,decimal addFormatter){
        return price+SalesTaxi(taxrate)+addFormatter;
    }
}