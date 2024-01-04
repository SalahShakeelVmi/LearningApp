<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\NewUserNotification;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
class SendNewUserNotification
{

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $user = User::where('email','!=', $event->user->email)->get();
        Notification::send($user, new NewUserNotification($event->user));
    }
}
