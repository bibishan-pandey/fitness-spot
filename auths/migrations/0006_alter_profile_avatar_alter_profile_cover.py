# Generated by Django 5.0.3 on 2024-04-10 05:50

import utils.media_upload
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auths", "0005_rename_pid_profile_uid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="avatar",
            field=models.ImageField(
                blank=True,
                default=utils.media_upload.default_avatar,
                null=True,
                upload_to=utils.media_upload.upload_avatar_location,
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="cover",
            field=models.ImageField(
                blank=True,
                default=utils.media_upload.default_cover,
                null=True,
                upload_to=utils.media_upload.upload_cover_location,
            ),
        ),
    ]
