# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-19 17:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0012_image_caption'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='test_field',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
