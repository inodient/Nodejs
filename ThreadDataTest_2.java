class UserThread_2 implements Runnable{
	private int count;
	
	@Override
	public void run() {
		while(true){
			if(count>=50000 ) break;
			try {
				countPrint();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	private synchronized void countPrint() throws InterruptedException {
		Thread.sleep(1500);
		System.out.println( ++count + " " + Thread.currentThread() );
	}
}

public class ThreadDataTest_2 {
	public static void main(String[] args) {
		System.out.println( Thread.currentThread() );
		UserThread_2 data = new UserThread_2(); // 공유 객체를 메모리에 한번만
		
		new Thread(data).start();
		new Thread(data).start();
		
		data = null;
	}
}
