# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-03 10:50
from __future__ import unicode_literals

from django.db import migrations, models
from dispatch.models import Topic

def set_defaults(apps, schema_editor):
    for topic in Topic.objects.all():
        topic.slug = topic._generate_slug()
        topic.save()

def reverse_set_defaults(apps, schema_editor):
    for topic in Topic.objects.all():
        topic.slug = None
        topic.save()

class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0019_podcast_choices'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='slug',
            field=models.SlugField(default='temp-slug'),
            preserve_default=False,
        ),
        migrations.RunPython(set_defaults, reverse_set_defaults),
        migrations.AlterField(
            model_name='topic',
            name='slug',
            field=models.SlugField(unique=True),
        ),
    ]