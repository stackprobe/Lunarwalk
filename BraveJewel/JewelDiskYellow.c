#include "C:\Factory\Common\all.h"

#define MTX_SERVER           "{5e331ef6-d984-4b93-9a1a-530a92c74311}" // shared_uuid
#define EV_DISK_YELLOW       "{586ec0f0-c21d-4475-a7d8-96bb58901985}" // shared_uuid
#define EV_DISK_YELLOW_ENDED "{5df3a2b6-b0d9-49fd-b415-c5afc971d643}" // shared_uuid

int main(int argc, char **argv)
{
	uint mtx = mutexOpen(MTX_SERVER);
	uint ev  = eventOpen(EV_DISK_YELLOW_ENDED);

	LOGPOS();
	eventWakeup(EV_DISK_YELLOW);
	LOGPOS();

	while(!handleWaitForMillis(ev, 2000))
	{
		LOGPOS();

		if(handleWaitForMillis(mtx, 0))
		{
			cout("�������T�[�o�[�������Ă��Ȃ��l�Ȃ̂Œ��~���܂��B\n");
			mutexRelease(mtx);
			break;
		}
		while(hasKey())
		{
			int key = getKey();

			if(key == 0x1b)
			{
				cout("�������G�X�P�[�v�L�[�������ꂽ�̂Œ��~���܂��B\n");
				goto endLoop;
			}

			cout("+------------+\n");
			cout("| ESC = ���~ |\n");
			cout("+------------+\n");
		}
	}
endLoop:
	LOGPOS();
	handleClose(mtx);
	handleClose(ev);
	LOGPOS();
}
