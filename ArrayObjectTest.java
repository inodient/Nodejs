// Object - Ŭ������ �ִ� Ÿ��, Ŭ������ ���� Ÿ��( [] : ���� �ڷ����϶� ��� )
class UserCharString{
	private String s;
	public UserCharString( String s ){
		this.s = s;
	}

	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		return super.equals(obj);
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}

	@Override
	protected void finalize() throws Throwable {
		// TODO Auto-generated method stub
		super.finalize();
	}
	
}


public class ArrayObjectTest {
	public static void main(String[] args) {
		String s1 = "hi";
		String s2 = new String("hi");
		char[] s3 = {'h', 'i'};
		UserCharString s4 = new UserCharString( "hi" );
		
		System.out.println( s1 );
		System.out.println( s2 );
		System.out.println( s3 );
		System.out.println( s4 );
		
		System.out.println( s1 == s2 );
	}
}
