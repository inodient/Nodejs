class UserThread extends Thread{
	private int count;
	
	@Override
	public void run() {
		while(true){
			if(count>=50) break;
			countPrint();
		}
	}

	private void countPrint() {
		System.out.println( ++count + " " + currentThread() );
	}
}

public class ThreadDataTest {
	public static void main(String[] args) {
		System.out.println( Thread.currentThread() );
		UserThread ut1 = new UserThread();
		//ut1.run();
		ut1.start(); // VM call --> new Thread --> ut1.run()
		
		UserThread ut2 = new UserThread();
		ut2.start();
	}
}
