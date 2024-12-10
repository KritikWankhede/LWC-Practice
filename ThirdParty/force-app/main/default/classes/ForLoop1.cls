public class ForLoop1 {
	public static void main()
   {
       integer n,i;
       n=2;
       for(i=1;i<10;i++)
       {
           System.debug(n+'x'+i+'=' +n*i);
       }
   }

    public static void main2()
    {
        for(integer i=1;i<=10;i++)
        { 
            if(i==8)
            {
                
                break; 
            }
            System.debug(i);     
        }
    }

 

}