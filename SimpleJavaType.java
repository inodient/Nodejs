
public class SimpleJavaType {
	
	public String getParameter( String id ){
		StringBuffer sb = new StringBuffer();
		sb.append( "Hello" );
		return sb.toString();
	}
	public CharSequence getNewParameter( String id ){
		return null;
	}
	
	
	public static void main(String[] args) {
		
		int num1 = 10, num2 = 100;
		byte num3 = 10, num4 = 100;
		
		System.out.println( num1 == num3 );
		byte b4 = 10+100;
		byte b5 = (byte)(num3 + num4); // 정수는 byte, short 로 정의된 연산은 int로 반환
		
		// 이름, 성 입력 받아서 문자열로 저장
		String name1 = "Changho";
		String name2 = "Kang";
		
		StringBuffer sb = new StringBuffer();
		sb.append( name1 );
		sb.append( name2 );
		
		System.out.println( sb );
	}
}
