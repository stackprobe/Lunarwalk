#include "C:\Factory\Common\all.h"

#define MTX_SERVER           "{5e331ef6-d984-4b93-9a1a-530a92c74311}" // shared_uuid
#define EV_DISK_YELLOW       "{586ec0f0-c21d-4475-a7d8-96bb58901985}" // shared_uuid
#define EV_DISK_YELLOW_ENDED "{5df3a2b6-b0d9-49fd-b415-c5afc971d643}" // shared_uuid

int main(int argc, char **argv)
{
	uint mtxServer = mutexOpen(MTX_SERVER);
	uint evStart = eventOpen(EV_DISK_YELLOW);
	uint evEnded = eventOpen(EV_DISK_YELLOW_ENDED);

	LOGPOS();
	eventSet(evStart);
	LOGPOS();

	while(!handleWaitForMillis(evEnded, 2000))
	{
		LOGPOS();

		if(handleWaitForMillis(mtxServer, 0))
		{
			cout("★★★サーバーが動いていない様なので中止します。\n");
			mutexRelease(mtxServer);
			break;
		}
		while(hasKey())
		{
			int key = getKey();

			if(key == 0x1b)
			{
				cout("★★★エスケープキーが押されたので中止します。\n");
				goto endLoop;
			}

			cout("+------------+\n");
			cout("| ESC = 中止 |\n");
			cout("+------------+\n");
		}
	}
endLoop:
	LOGPOS();
	handleClose(mtxServer);
	handleClose(evStart);
	handleClose(evEnded);
	LOGPOS();
}
